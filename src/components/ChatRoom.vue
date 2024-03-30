<template>
  <main>
    <h3>Welcome to ChatRoom {{ chatId }}</h3>
    <router-link class="button is-info is-fullwidth" :to="{ name: 'home' }">
      Back
    </router-link>
    <hr />
    <UserComponent>
      <template #user="{ user }">
        <ul>
          <li v-for="message of messages" :key="message.id">
            <ChatMessage
              :message="message"
              :owner="user.uid === message.sender"
            />
          </li>
        </ul>
        <input class="input" v-model="newMessageText" />
        <hr />
        <h5>Record Audio</h5>

        <button
          class="button is-danger is-fullwidth"
          v-if="!recorder"
          @click="record()"
        >
          Record
        </button>
        <button class="button is-danger is-fullwidth" v-else @click="stop()">
          Stop
        </button>
        <hr v-if="newAudio" />
        <h5 v-if="newAudio">Preview Audio</h5>
        <audio v-if="newAudio" :src="newAudioUrl" controls></audio>
        <hr />
        <button
          :disabled="(!newMessageText && !newAudio) || loading"
          class="button is-success is-fullwidth"
          type="text"
          @click="addMessage(user.uid)"
        >
          Send
        </button>
      </template>
    </UserComponent>
  </main>
</template>

<script setup>
import UserComponent from "./User.vue";
import ChatMessage from "./ChatMessage.vue";
import {
  db,
  addMessageToChat,
  collection,
  query,
  orderBy,
  limitToLast,
} from "../firebase";
import { useCollection } from "vuefire";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const newMessageText = ref("");
const loading = ref(false);
const newAudio = ref(null);
const newAudioUrl = computed(() => {
  if (!newAudio.value) return null;
  return URL.createObjectURL(newAudio.value);
});
const recorder = ref(null);
const chatId = route.params.id;
const contactSource = computed(() =>
  query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc"),
    limitToLast(10)
  )
);
const messages = useCollection(contactSource);

async function addMessage(uid) {
  loading.value = true;
  await addMessageToChat(
    chatId,
    {
      text: newMessageText.value,
      sender: uid,
      createdAt: Date.now(),
    },
    newAudio.value
  );

  loading.value = false;
  newMessageText.value = "";
  newAudio.value = null;
}

async function record() {
  newAudio.value = null;
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  const options = { mimeType: "audio/webm" };
  const recordedChunks = [];
  recorder.value = new MediaRecorder(stream, options);
  recorder.value.addEventListener("dataavailable", (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  });

  recorder.value.addEventListener("stop", () => {
    newAudio.value = new Blob(recordedChunks);
  });

  recorder.value.start();
}

async function stop() {
  recorder.value.stop();
  recorder.value = null;
}
</script>

<style scoped>
main {
  padding: 40px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background: #efefef;
  padding: 10px;
  border-radius: 0;
}
audio {
  width: 100%;
  margin-top: 20px;
}
li {
  display: flex;
}
</style>

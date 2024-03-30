<template>
  <main>
    <h3>Welcome to ChatRoom {{ chatId }}</h3>
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
        <input v-model="newMessageText" />

        <button
          :disabled="!newMessageText || loading"
          class="button is-success"
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
import { db, addMessageToChat, collection } from "../firebase";
import { useCollection } from "vuefire";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { query } from "firebase/database";
import { orderBy, limitToLast } from "firebase/firestore";

const route = useRoute();
const newMessageText = ref("");
const loading = ref(false);
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
  this.loading = true;
  await addMessageToChat(this.chatId, {
    text: this.newMessageText,
    sender: uid,
    createdAt: Date.now(),
  });

  this.loading = false;
  this.newMessageText = "";
}
</script>

<style scoped>
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

li {
  display: flex;
}
</style>

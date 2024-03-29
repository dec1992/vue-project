<template>
  <div>
    <ul>
      <li v-for="chat of chats" :key="chat.createdAt">{{ chat.createdAt }}</li>
    </ul>
    <button @click="createChatRoom()">Create New Chat Room</button>
  </div>
</template>

<script>
import { addChat, getChatsByUid } from "../firebase";
import { ref } from "vue";
export default {
  name: "ChatList",
  setup(props) {
    const chats = ref([]);
    (async () => {
      const res = await getChatsByUid(props.uid);
      console.log(res);
      chats.value = res;
    })();
    return {
      chats,
    };
  },
  methods: {
    async createChatRoom() {
      await addChat({
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid],
      });
      const res = await getChatsByUid(this.uid);
      this.chats = res;
    },
  },
  props: ["uid"],
};
</script>

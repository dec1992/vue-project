<template>
  <div>
    <ul>
      <li v-for="chat of chats" :key="chat.id">
        <router-link :to="{ name: 'chat', params: { id: chat.id } }">{{
          chat.id
        }}</router-link>
      </li>
    </ul>
    <button @click="createChatRoom()">Create New Chat Room</button>
  </div>
</template>

<script>
import { addChat, chatsRef, query, where } from "../firebase";
import { useCollection } from "vuefire";
export default {
  name: "ChatList",
  setup(props) {
    const chats = useCollection(
      query(chatsRef, where("owner", "==", props.uid))
    );
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
    },
  },
  props: ["uid"],
};
</script>

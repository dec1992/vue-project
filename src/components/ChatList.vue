<template>
  <div>
    <hr />
    <h3 v-if="chats.length">My Chats:</h3>
    <ul v-if="chats.length">
      <li v-for="chat of chats" :key="chat.id">
        <router-link :to="{ name: 'chat', params: { id: chat.id } }">
          <p>{{ chat.id }}</p>
          <p>{{ chat.members.length }} members</p>
        </router-link>
      </li>
    </ul>
    <button class="button is-success is-fullwidth" @click="createChatRoom()">
      Create New Chat Room
    </button>
  </div>
  <div>
    <hr />
    <h3 v-if="otherChats.length">Other Chats:</h3>
    <ul v-if="otherChats.length">
      <li v-for="chat of otherChats" :key="chat.id">
        <router-link :to="{ name: 'chat', params: { id: chat.id } }">
          <p>{{ chat.id }}</p>
          <p>{{ chat.members.length }} members</p>
        </router-link>
      </li>
    </ul>
    <label class="label marginTop">Chat Room Id</label>
    <input
      class="input"
      v-model="newChatId"
      placeholder="********************"
    />
    <button
      class="button is-success is-fullwidth marginTop"
      @click="joinChat()"
      :disabled="!newChatId || loading"
    >
      Join New Chat Room
    </button>
  </div>
</template>

<script>
import { addChat, chatsRef, joinChatRoom, query, where } from "../firebase";
import { useCollection } from "vuefire";
export default {
  name: "ChatList",
  setup(props) {
    const chats = useCollection(
      query(chatsRef, where("owner", "==", props.uid))
    );

    const otherChats = useCollection(
      query(
        chatsRef,
        where("members", "array-contains", props.uid),
        where("owner", "!=", props.uid)
      )
    );
    return {
      chats,
      otherChats,
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
    async joinChat() {
      this.loading = true;
      await joinChatRoom(this.newChatId, this.uid);
      this.loading = false;
      this.newChatId = "";
    },
  },
  props: ["uid"],
  data() {
    return {
      loading: false,
      newChatId: "",
    };
  },
};
</script>

<style scoped>
li {
  background: #efefef;
  padding: 10px;
  list-style-type: none;
  margin: 0;
  margin-top: 10px;
}
ul {
  margin: 0;
}
a {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
p:not(:last-child) {
  margin-bottom: 0;
}
.marginTop {
  margin-top: 10px;
}
</style>

<template>
  <div>
    <h3>Home</h3>
    <UserComponent>
      <template v-slot:user="{ user }">
        <div v-if="user">
          <UserProfile :user="user" />
          <ChatList :uid="user.uid" />
        </div>
        <LoginComponent v-else />
      </template>
    </UserComponent>
  </div>
</template>

<script>
import LoginComponent from "./Login.vue";
import UserComponent from "./User.vue";
import UserProfile from "./UserProfile.vue";
import ChatList from "./ChatList.vue";
export default {
  name: "HomeComponent",
  components: {
    LoginComponent,
    UserComponent,
    UserProfile,
    ChatList,
  },
};
</script>
<template>
  <div>
    <h3>Home</h3>
    <UserComponent>
      <template v-slot:user="{ user }">
        <div v-if="user">Logged-in as {{ user.uid }}</div>
        <LoginComponent v-else />
      </template>
    </UserComponent>
  </div>
</template>

<script>
import LoginComponent from "./Login.vue";
import UserComponent from "./User.vue";
export default {
  name: "HomeComponent",
  components: {
    LoginComponent,
    UserComponent,
  },
};
</script>
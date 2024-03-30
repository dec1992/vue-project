<template>
  <main>
    <p>Logged in as {{ user.uid }}</p>

    <button class="button is-info" @click="logOut()">Sign Out</button>
  </main>
</template>

<script>
import { logOut } from "../firebase";
export default {
  data() {
    return {
      logOut,
    };
  },
  props: ["user"],
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  padding: 0;
}
</style>

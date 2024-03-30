<template>
  <div>
    <p>Logged in as {{ user.uid }}</p>

    <button class="button is-info is-fullwidth" @click="logOut()">
      Sign Out
    </button>
  </div>
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

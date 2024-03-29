<template>
  <div>
    Logged in as {{ user.uid }}

    <button @click="logOut()">Sign Out</button>
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

<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button @click="anonSignIn()">Sign In</button>
  </aside>
</template>

<script>
import { anonSignIn } from "../firebase";

export default {
  name: "LoginComponent",
  data() {
    return {
      anonSignIn,
    };
  },
};
</script>

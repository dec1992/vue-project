<template>
  <div>
    <slot name="user" v-bind:user="user"></slot>
  </div>
</template>

<script>
import { ref } from "vue";
import { onAuthChanged } from "../firebase";

export default {
  name: "UserComponent",
  setup() {
    const user = ref(null);
    const unsubscribe = onAuthChanged(
      (firebaseUser) => (user.value = firebaseUser)
    );
    return {
      user,
      unsubscribe,
    };
  },
};
</script>

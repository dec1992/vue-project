<template>
  <aside class="section">
    <h3>Sign in Anonymously</h3>
    <button @click="anonSignIn()">Sign In</button>

    <div v-if="newUser">
      <h3>Sign Up for a New Account</h3>
      <a href="#" @click="newUser = false">Returning User?</a>
    </div>

    <div v-else>
      <h3>Sign In with Email</h3>
      <a href="#" @click="newUser = true">New User?</a>
    </div>

    <label for="email">Email</label><br />
    <input v-model="email" placeholder="email" type="email" class="input" />

    <label for="password">Password</label><br />
    <input
      v-model="password"
      placeholder="password"
      type="password"
      class="input"
    />
    <br />

    <button
      class="button is-info"
      :class="{ 'is-loading': loading }"
      @click="signInOrCreateUser()"
    >
      {{ newUser ? "Sign Up" : "Login" }}
    </button>

    <p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
  </aside>
</template>

<script>
import {
  anonSignIn,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase";

export default {
  name: "LoginComponent",
  data() {
    return {
      newUser: false,
      email: "",
      password: "",
      anonSignIn,
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async signInOrCreateUser() {
      this.loading = true;
      this.errorMessage = "";
      try {
        if (this.newUser) {
          await createUserWithEmailAndPassword(auth, this.email, this.password);
        } else {
          await signInWithEmailAndPassword(auth, this.email, this.password);
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
      this.loading = false;
    },
  },
};
</script>

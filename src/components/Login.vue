<template>
  <aside class="section">
    <hr />
    <h3 class="has-text-centered">Sign in Anonymously</h3>
    <button class="button is-info is-fullwidth" @click="anonSignIn()">
      Sign In
    </button>
    <hr />
    <div class="login" v-if="newUser">
      <h3 class="has-text-centered">Sign Up for a New Account</h3>
      <a href="#" @click="newUser = false">Returning User?</a>
    </div>

    <div class="login" v-else>
      <h3 class="has-text-centered">Sign In with Email</h3>
      <a href="#" @click="newUser = true">New User?</a>
    </div>

    <label class="label marginTop" for="email">Email</label>
    <input class="input" v-model="email" placeholder="email" type="email" />

    <label class="label marginTop" for="password">Password</label>
    <input
      v-model="password"
      placeholder="password"
      type="password"
      class="input"
    />
    <br />

    <button
      class="button is-info is-fullwidth marginTop"
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

<style scoped>
aside {
  padding: 0;
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.marginTop {
  margin-top: 10px;
}
</style>

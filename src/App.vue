<template>
  <div id="app">
    <header>
      <h1>Vue Chatroom</h1>
      <p>Realtime Text/Voice Chat</p>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped>
header {
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<script setup>

</script>

<template>
<!-- load the routers and background image -->
  <img src="./assets/background.png" alt="background-image">
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  opacity: 0.7;
}
</style>

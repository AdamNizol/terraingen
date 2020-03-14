<template>
  <div id="app">
    <Display />
  </div>
</template>

<script>
import Display from "./components/Display.vue";

export default {
  name: "App",
  components: {
    Display
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
body{
  margin:0;
  background-color: rgb(70,70,90);
}
</style>

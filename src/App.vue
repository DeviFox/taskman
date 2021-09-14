<template>
  <Navbar></Navbar>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import Navbar from './components/Navbar.vue'
import BoardPage from './components/BoardPage.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    BoardPage
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
</style>

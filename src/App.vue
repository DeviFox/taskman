<template>
  <Navbar></Navbar>
  <BoardPage></BoardPage>

</template>

<script>
import Navbar from './components/Navbar.vue'
import BoardPage from './components/BoardPage.vue'

export default {
  name:       'App',
  components: {
    Navbar,
    BoardPage
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

#app {
  font-family:             'Open Sans', sans-serif;
  -webkit-font-smoothing:  antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:              center;

}

html, body {
  min-width: 100%;
  margin:    0;
  padding:   0;
}
</style>

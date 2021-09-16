<template>
  <div class="container">
    <div class="wrapper">
      <div class="item">Создана</div>
      <div class="item">В работе</div>
      <div class="item">Завершена</div>
    </div>
  </div>
</template>

<script>
export default {
  name:  'BoardPage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.container {
  margin: 50px 0;
  width:  100%;
  height: 300px;
}

.wrapper {
  justify-content: center;
  width:           100%;
  margin:          auto;
  display:         flex;
  flex-direction:  row;
  flex-wrap:       wrap;

  height:          100%;

}

.item {
  flex-shrink:      0;
  height:           100%;
  margin:           10px 10px;

  width:            200px;
  background-color: #42b983;
}

</style>

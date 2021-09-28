<template>
  <div class="add-window">
    <input id="add-form" class="add-form" v-model="title" placeholder="Название">
    <input class="add-form" v-model="text" placeholder="Описание">
    <input class="add-form" v-model="author" placeholder="Автор">
    <input class="add-form" v-model="date" type="date">
    <button class="add-btn" type="submit">+</button>
  </div>
</template>

<script>
export default {
  name: "AddForm.vue",
  data() {
    return {
        title:     '',
        status:    '',
        text:      '',
        author:    '',
        date:      '',
        startDate: '',
      }
    },
  methods:{
    submit(){
      
    }
  }
  }
</script>

<style scoped lang="scss">
.add-window {
  background-color: white;
  position:       absolute;
  display:        flex;
  flex-direction: column;
  left:           0;
  margin:         10px;
}

.add-form {
  height:        30px;
  margin-top:    5px;
  border-radius: 6px;
  border-color:  #42b983;

}

.add-btn {
  margin-left:   70px;
  margin-top:    5px;
  height:        30px;
  width:         30px;
  border-radius: 7px;
  border-color:  #42b983;
}
</style>
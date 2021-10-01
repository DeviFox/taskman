<template>
  <form class="add-window" @submit.prevent="submit">
    <input id="add-form" class="add-form" v-model="title" placeholder="Название">
    <input class="add-form" v-model="text" placeholder="Описание">
    <input class="add-form" v-model="author" placeholder="Автор">
    <input class="add-form" v-model="date" type="date">
    <button class="add-btn" type="submit">+</button>
  </form>
</template>

<script>
import {mapMutations} from 'vuex'

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
  methods: {
    ...mapMutations(['addTask']),
    submit() {
      this.addTask({
        title:      this.title,
        status:     this.status,
        text:       this.text,
        author:     this.author,
        date:       this.date,
        startDate:  this.startDate,
        finishDate: this.finishDate,
      });
      this.saveTask()
      this.title = this.text = this.author = this.date = '';
    }
  }
}

</script>

<style scoped lang="scss">
.add-window {
  background-color: white;
  position:         absolute;
  display:          flex;
  flex-direction:   column;
  left:             0;
  margin:           10px;

}

.add-form {
  height:        30px;
  margin-top:    5px;
  border-radius: 6px;
  border-color:  #42b983;
  color: gray;
  border-style: solid

}

.add-btn {
  margin-left:   70px;
  margin-top:    5px;
  height:        30px;
  width:         30px;
  border-radius: 7px;
  border-color:  #42b983;
  border-style: solid
}
</style>
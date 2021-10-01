<template>
  <div class="container">

    <div class="wrapper">
      <AddForm/>
      <!--   1 Колонка   -->
      <div class="drop-zone"
           v-for="board in allBoards"
           @drop="itemDrop($event, board.id)"
           @dragenter.prevent
           @dragover.prevent
      >
        <p>{{ board.title }}</p>
        <hr class="column-hr">
        <div v-for="task in board.tasks"
             :key="task.id"
             class="drag-item"
             draggable="true"
             @dragstart="itemDrag($event, task)"
        >

          Статус: {{ task.status }} <br>
          <hr>
          {{ task.title }}
          <hr class="title-hr">
          {{ task.text }}
          <hr class="title-hr">
          Автор: {{ task.author }}
          <br>
          <span v-if="task.date !==''">  Дата добавления: {{ dateFilter(task.date) }}</span> <br>
          <span v-if="board.title === 'В работе'"> Дата начала: {{ dateFilter(task.startDate) }} </span>
          <span v-if="board.title === 'Завершено'"> Дата завершения: {{ this.dateFilter(task.finishDate) }} </span> <br>
          <span v-if="board.title === 'Завершено'"> Затрачено времени: {{ task.usedTime }} часов</span>
          <button class="del-btn" @click="delTask(task.id)"  type="submit">-</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddForm from './AddForm';
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name:       'BoardPage',
  components: {AddForm},

  mounted() {
    this.getTrelloData()
  },


  computed: {
    ...mapGetters(['allTasks', 'allBoards']),
    boards() {
      return this.allBoards
    },
  },

  methods: {
    ...mapActions(['getTrelloData', 'delTask']),
    ...mapMutations(['updateTask']),

    dateFilter(value, format = "date") {                                              //Фильтр для даты
      const opt = {};
      if (format.includes("date")) {
        (opt.day = "2-digit"), (opt.month = "long"), (opt.year = "numeric");
      }
      if (format.includes("time")) {
        (opt.hour = "2-digit"), (opt.minute = "2-digit"), (opt.second = "2-digit");
      }
      return new Intl.DateTimeFormat("ru-RU", opt).format(new Date(value));
    },


    itemDrag(event, task) {
      event.dataTransfer.dropEffect    = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('taskId', task.id)
    },

    itemDrop(event, boardId) {
      const taskId = event.dataTransfer.getData('taskId')
      this.updateTask({taskId, boardId})
      this.saveTask()

    },


    saveTask() {
      const jsonTasks = JSON.stringify(this.allTasks)
      localStorage.setItem('tasks', jsonTasks)

      const jsonBoards = JSON.stringify(this.allBoards)
      localStorage.setItem('boards', jsonBoards)
    },

  },
}
</script>


<style scoped lang="scss">

.container {
  margin: 50px 0;
  width:  100%;
  height: 100%;
}

.wrapper {
  justify-content: center;

  display:         flex;
  flex-direction:  row;
  flex-wrap:       wrap;
  min-height:      50px;

}


.drop-zone {
  justify-content:  center;
  height:           100%;
  width:            250px;
  margin:           10px 10px;
  display:          flex;
  flex-direction:   column;
  flex-wrap:        wrap;
  min-height:       50px;
  background-color: ghostwhite;
  flex-shrink:      0;
  border-radius:    5px;

  p {
    font-size: 20px;
    margin:    10px 10px;
    position:  relative;
  }


}

.column-hr {
  margin:           0 0 10px 0;
  width:            100%;
  border:           none;
  height:           2px;
  background-color: #42b983;
}
.del-btn {
  margin-top:    5px;
  height:        20px;
  width:         50px;
  border-radius: 5px;
  background-color: #42b983;
  border-color: ghostwhite;
  border-style: solid;
  border-width: 1px
}

.drag-item {
  border-radius:    5px;
  height:           100%;
  margin:           5px 10px;
  padding:          5px;

  background-color: #42b983;
  font-size:        15px;
  width:            220px;
  word-wrap:        break-word;

  hr {
    background-color: ghostwhite;
    border:           none;
    height:           1px;

  }
}
</style>

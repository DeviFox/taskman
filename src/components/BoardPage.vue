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
        <p>{{board.title}}</p>
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
          <span v-if="task.date !==''">  Дата добавления: {{dateFilter(task.date) }}</span>
          <span v-if="task.startDate"> Дата начала: {{dateFilter(task.startDate)}} </span>
          <span v-if="task.finishDate"> Дата завершения: {{this.dateFilter(task.finishDate) }} </span> <br>
          Затрачено времени: {{task.usedTime}} часов
        </div>
      </div>

<!--&lt;!&ndash;         2 Колонка&ndash;&gt;-->
<!--      <div class="drop-zone"-->
<!--           v-for="board in boards"-->
<!--           @drop="itemDrop($event, 2)"-->
<!--           @dragenter.prevent-->
<!--           @dragover.prevent-->
<!--      >-->
<!--        <p>{{board.title}}</p>-->
<!--        <hr class="column-hr">-->
<!--        <div v-for="task in board.tasks"-->
<!--             :key="task.id"-->
<!--             class="drag-item"-->
<!--             draggable="true"-->
<!--             @dragstart="itemDrag($event, task)"-->
<!--        >-->
<!--          Статус: {{ task.status }} <br>-->
<!--          <hr>-->
<!--          {{ task.title }}-->
<!--          <hr class="title-hr">-->
<!--          {{ task.text }}-->
<!--          <hr class="title-hr">-->
<!--          Автор: {{ task.author }}-->
<!--          <br>-->
<!--          <span v-if="task.date"> Дата добавления: {{dateFilter(task.date)}} </span> <br>-->
<!--          <span v-if="task.startDate"> Дата начала: {{dateFilter(task.startDate)}} </span>-->
<!--        </div>-->
<!--      </div>-->

<!--   3 Колонка   -->
<!--      <div class="drop-zone"-->
<!--           @drop="itemDrop($event, 3)"-->
<!--           @dragenter.prevent-->
<!--           @dragover.prevent-->
<!--      >-->
<!--        <p>Завершена</p>-->
<!--        <hr class="column-hr">-->
<!--        <div v-for="item in allCards"-->
<!--             :key="item.id"-->
<!--             class="drag-item"-->
<!--             draggable="true"-->
<!--             @dragstart="itemDrag($event, item)"-->
<!--        >-->
<!--          Статус: {{ item.status }} <br>-->
<!--          <hr>-->
<!--          {{ item.title }}-->
<!--          <hr class="title-hr">-->
<!--          {{ item.text }}-->
<!--          <hr class="title-hr">-->
<!--          Автор: {{ item.author }}<br>-->

<!--          <span v-if="item.date"> Дата добавления: {{this.dateFilter(item.date) }} </span> <br>-->
<!--          <span v-if="item.finishDate"> Дата завершения: {{this.dateFilter(item.finishDate) }} </span> <br>-->
<!--           Затрачено времени: {{item.usedTime}} часов-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import AddForm from './AddForm';
import {mapGetters, mapActions, mapMutations} from  'vuex'

export default {
  name:  'BoardPage',
  components:{AddForm},

  mounted() {
    this.getTrelloData()
  },


computed: {
    ...mapGetters(['allTasks', 'allBoards']),
  boards(){
      return this.allBoards
  },
},

  methods: {
    ...mapActions(['getTrelloData']),
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
      console.log(task)
      event.dataTransfer.dropEffect    = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('taskId', task.id)
      console.log(task.id)
    },

    itemDrop(event, boardId) {
      const taskId = event.dataTransfer.getData('taskId')
      this.updateTask(taskId, boardId)
      this.saveTask()

    },

    usedTime(dt2, dt1) {

      let diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= (60 * 60);
      return Math.abs(Math.round(diff));

    },

    saveTask(){
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

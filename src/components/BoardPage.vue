<template>
  <div class="container">

    <div class="wrapper">
      <div class="add-window">
        <input id="add-form" class="add-form" v-model="newCard.title" placeholder="Название">
        <input class="add-form" v-model="newCard.text" placeholder="Описание">
        <input class="add-form" v-model="newCard.author" placeholder="Автор">
        <input class="add-form" v-model="newCard.date" type="date">
        <button class="add-btn" v-on:click="addTask">+</button>
      </div>

      <!--   1 Колонка   -->
      <div class="drop-zone"
           @drop="itemDrop($event, 1)"
           @dragenter.prevent
           @dragover.prevent
      >
        <p>Создана</p>
        <hr class="column-hr">
        <div v-for="item in getList(1)"
             :key="item.id"
             class="drag-item"
             draggable="true"
             @dragstart="itemDrag($event, item)"
        >

          Статус: {{ item.status }} <br>
          <hr>
          {{ item.title }}
          <hr class="title-hr">
          {{ item.text }}
          <hr class="title-hr">
          Автор: {{ item.author }}
          <br>
          <span v-if="item.date !==''">  Дата добавления: {{dateFilter(item.date) }}</span>

        </div>
      </div>

      <!--   2 Колонка   -->
      <div class="drop-zone"
           @drop="itemDrop($event, 2)"
           @dragenter.prevent
           @dragover.prevent
      >
        <p>В работе</p>
        <hr class="column-hr">
        <div v-for="item in getList(2)"
             :key="item.id"
             class="drag-item"
             draggable="true"
             @dragstart="itemDrag($event, item)"
        >
          Статус: {{ item.status }} <br>
          <hr>
          {{ item.title }}
          <hr class="title-hr">
          {{ item.text }}
          <hr class="title-hr">
          Автор: {{ item.author }}
          <br>
          <span v-if="item.date"> Дата добавления: {{dateFilter(item.date)}} </span> <br>
          <span v-if="item.startdate"> Дата начала: {{dateFilter(item.startdate)}} </span>
        </div>
      </div>

<!--   3 Колонка   -->
      <div class="drop-zone"
           @drop="itemDrop($event, 3)"
           @dragenter.prevent
           @dragover.prevent
      >
        <p>Завершена</p>
        <hr class="column-hr">
        <div v-for="item in getList(3)"
             :key="item.id"
             class="drag-item"
             draggable="true"
             @dragstart="itemDrag($event, item)"
        >
          Статус: {{ item.status }} <br>
          <hr>
          {{ item.title }}
          <hr class="title-hr">
          {{ item.text }}
          <hr class="title-hr">
          Автор: {{ item.author }}<br>

          <span v-if="item.date"> Дата добавления: {{this.dateFilter(item.date) }} </span> <br>
          <span v-if="item.finishdate"> Дата завершения: {{this.dateFilter(item.finishdate) }} </span> <br>
           Затрачено времени: {{item.usedtime}} часов
        </div>
      </div>
    </div>
  </div>
</template>

<script>

let moment = require('moment');
moment.locale('ru');

export default {
  name:  'BoardPage',
  props: {
    msg: String
  },
  data() {
    return {
      items:   [],
      newCard: {
        title:  '',
        status: '',
        text:   '',
        author: '',
        date:   '',
        startdate:'',
      }
    };
  },



  mounted() {
    if (localStorage.getItem('items')) {
      try {
        this.items = JSON.parse(localStorage.getItem('items'));
      } catch (e) {
        localStorage.getItem('items');
      }
    }

  },

  methods: {
    dateFilter(value, format = "date") {
      const opt = {};
      if (format.includes("date")) {
        (opt.day = "2-digit"), (opt.month = "long"), (opt.year = "numeric");
      }
      if (format.includes("time")) {
        (opt.hour = "2-digit"), (opt.minute = "2-digit"), (opt.second = "2-digit");
      }
      return new Intl.DateTimeFormat("ru-RU", opt).format(new Date(value));
    },

    getList(list) {
      return this.items.filter((item) => item.list === list)
    },


    itemDrag(event, item) {
      console.log(item)
      event.dataTransfer.dropEffect    = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item.id)
      this.saveTask()
    },


    itemDrop(event, list) {
      const itemID = event.dataTransfer.getData('itemID')
      const item   = this.items.find((item) => item.id === +itemID)
      item.list    = list

      if (list === 1) {
        item.status = "Создана"
      }
      else if (list === 2) {
        item.status = "В работе"
        item.startdate = new Date();
      }
      else if (list === 3) {
        item.status = "Завершена"
        item.finishdate = new Date();
        item.usedtime = this.usedtime( new Date(item.finishdate), new Date(item.startdate));
      }
      this.saveTask()
    },

    usedtime(dt2, dt1) {

      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= (60 * 60);
      return Math.abs(Math.round(diff));

    },

    addTask() {
      this.items.push({id: this.items.length, title: this.newCard.title, status: this.newCard.status, text: this.newCard.text, author: this.newCard.author, date: new Date(this.newCard.date), list: 1})
      this.newCard.title  = '';
      this.newCard.text   = '';
      this.newCard.author = '';
      this.newCard.date   = '';
      this.newCard.startdate = '';
      this.newCard.usedtime = '';
      this.newCard.finishdate = '';
      this.newCard.status = '';
      this.saveTask()
    },


    saveTask(){
      const parsed = JSON.stringify(this.items);
      localStorage.setItem('items', parsed)
    },

    format(date) {
      return moment(date).format('DD.MM.YYYY');

    }
  },


}
</script>


<style scoped lang="scss">

.container {
  margin: 50px 0;
  width:  100%;
  height: 100%;
}

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

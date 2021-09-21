<template>
  <div class="container">

    <div class="wrapper">
      <div class="add-window">
        <input class="add-form" v-model="newCard.title" placeholder="Название">
        <input class="add-form" v-model="newCard.text" placeholder="Текст">
        <input class="add-form" v-model="newCard.author" placeholder="Автор">
        <input class="add-form" v-model="newCard.date" type="date">
        <button class="add-btn" v-on:click="addTask">+</button>
      </div>

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
          <hr>
          Дата добавления: {{ item.date }}

        </div>
      </div>
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
          <hr>
          Дата добавления: {{ item.date }}
        </div>
      </div>
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
          Автор: {{ item.author }}
          <hr>
          Дата добавления: {{ item.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:  'BoardPage',
  props: {
    msg: String
  },
  data() {
    new Date()
    return {
      items:   [
        {id: 0, title: 'Задача 1', status: '', text: 'Требуется создать отображение приложение «Таск-менеджер» с возможностью отслеживания текущих задач.', author: 'Admin', date: '2021-05-21', list: 1},
        {id: 1, title: 'Вторая задача', status: '', text: 'С возможностью отслеживания текущих задач', author: 'Admin 2', date: '2021-05-12', list: 2},
        {id: 2, title: 'Тоже задача', status: '', text: 'Приложение должно предоставлять графический интерфейс для отображения задач. Карточка задачи характеризуется следующими атрибутами:', author: 'Не я', date: '2021-08-01', list: 2},
        {id: 3, title: 'Еще задача', status: '', text: 'Для реализации приложения нужно использовать Vue , SCSS.', author: 'Test', date: '2021-07-11', list: 3},
        {id: 4, title: 'Маленькая задача', status: '', text: 'Приложение должно быть в виде 3 дорожек(колонок) «Создана», «В работе», «Завершена» в каждой из которой находятся карточки задач.', author: 'Ну уж точно не я', date: '2021-09-14', list: 3},
        {id: 5, title: 'Последняя задача', status: '', text: 'Данные для карточек заполнить самостоятельно', author: 'God', date: '2021-07-17', list: 1},
      ],
      newCard: {
        title:  '',
        status: '',
        text:   '',
        author: '',
        date:   '',
      }
    };
  },


  methods: {
    getList(list) {
      return this.items.filter((item) => item.list == list)
    },
    itemDrag(event, item) {
      console.log(item)
      event.dataTransfer.dropEffect    = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item.id)
    },
    itemDrop(event, list) {
      const itemID = event.dataTransfer.getData('itemID')
      const item   = this.items.find((item) => item.id == itemID)
      item.list    = list
      if (item.list == 1) {
        item.status = "Создана"
      }
      else if (item.list == 2) {
        item.status = "В работе"
      }
      else if (item.list == 3) {
        item.status = "Завершена"
      }

    },
    addTask() {
      this.items.push({id: this.items.length, title: this.newCard.title, status: this.newCard.status, text: this.newCard.text, author: this.newCard.author, date: this.newCard.date, list: 1})
      this.newCard.title  = '';
      this.newCard.text   = '';
      this.newCard.author = '';
      this.newCard.date   = '';
      this.newCard.status = '';
    },
  }
}
</script>


<style scoped lang="scss">

.container {
  margin: 50px 0;
  width:  100%;
  height: 100%;
}

.add-window {
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
  height:        26px;
  width:         26px;
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
  width:            200px;
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
  min-width:        150px;
  background-color: #42b983;
  font-size:        15px;
  width:            170px;
  word-wrap:        break-word;

  hr {
    background-color: ghostwhite;
    border:           none;
    height:           1px;

  }
}
</style>

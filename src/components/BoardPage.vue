<template>
  <div class="container">
    <div class="wrapper">
      <div class="drop-zone"
           @drop="itemDrop($event, 1)"
           @dragenter.prevent
           @dragover.prevent
      >
        <p>Создана</p>
        <hr>
        <div v-for="item in getList(1)"
             :key="item.id"
             class="drag-item"
             draggable="true"
             @dragstart="itemDrag($event, item)"
        >
          {{ item.title }}
          <hr style="background-color:ghostwhite;
          height:1px;
          margin: 5px 0 10px 0">
          {{ item.text }}
        </div>
      </div>
      <div class="drop-zone"
           @drop="itemDrop($event, 2)"
           @dragenter.prevent
           @dragover.prevent
      >
        <p>В работе</p>
        <hr>
        <div v-for="item in getList(2)"
             :key="item.id"
             class="drag-item"
             draggable="true"
             @dragstart="itemDrag($event, item)"
        >
          {{ item.title }}
          <hr style="background-color:ghostwhite;
          height:1px;
          margin:  5px 0 10px 0">
          {{ item.text }}
        </div>
      </div>
      <div class="drop-zone"
           @drop="itemDrop($event, 3)"
           @dragenter.prevent
           @dragover.prevent
      >
        <p>Завершена</p>
        <hr>
        <div v-for="item in getList(3)"
             :key="item.id"
             class="drag-item"
             draggable="true"
             @dragstart="itemDrag($event, item)"
        >
          {{ item.title }}
          <hr style="background-color:ghostwhite;
          height:1px;
          margin: 5px 0 10px 0">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';

export default {
  name:  'BoardPage',
  props: {
    msg: String
  },
  setup() {
    const items    = ref([
      {id: 0, title: 'Задача', text: 'Требуется создать отображение приложение «Таск-менеджер» с возможностью отслеживания текущих задач.',                                         list: 1},
      {id: 1, title: 'Вторая задача', text: 'С возможностью отслеживания текущих задач',                                                                                            list: 1},
      {id: 2, title: 'Тоже задача', text: 'Приложение должно предоставлять графический интерфейс для отображения задач. Карточка задачи характеризуется следующими атрибутами:',    list: 1},
      {id: 3, title: 'Еще задача', text: 'Для реализации приложения нужно использовать Vue , SCSS.',                                                                                list: 1},
      {id: 4, title: 'Маленькая задача', text: 'Приложение должно быть в виде 3 дорожек(колонок) «Создана», «В работе», «Завершена» в каждой из которой находятся карточки задач.', list: 1},
      {id: 5, title: 'Последняя задача', text: 'Данные для карточек заполнить самостоятельно',                                                                                      list: 1},

    ])
    const getList  = (list) => {
      return items.value.filter((item) => item.list == list)
    }
    const itemDrag = (event, item) => {
      console.log(item)
      event.dataTransfer.dropEffect    = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item.id)

    }
    const itemDrop = (event, list) => {
      const itemID = event.dataTransfer.getData('itemID')
      const item   = items.value.find((item) => item.id == itemID)
      item.list    = list
    };


    return {getList, itemDrop, itemDrag}
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

  hr {
    margin:           0 0 10px 0;
    width:            100%;
    border:           none;
    height:           2px;
    background-color: #42b983;
  }



}

.drag-item {
  border-radius:    5px;
  height:           100%;
  margin:           5px 10px;
  padding:          5px;
  min-width:        150px;
  background-color: #42b983;
  font-size: 15px;

}

</style>

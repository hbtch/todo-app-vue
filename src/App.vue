<template>
  <div id="app">
<!-- передается отфильтрованный список задач и передаем метод для обновления-->
    <ToDoFilter @filter="setFilteredTodos"/>
<!-- отображение списка задач и отображение отфильтрованных задач-->
    <ToDo :todos="filteredTodos"/>
  </div>
</template>

<script>
import ToDoFilter from './components/ToDoFilter.vue';
import ToDo from './components/ToDo.vue';

export default {
  components: {
    ToDoFilter,
    ToDo,
  },
  data() {
    return {
// filteredTodos - это реактивное свойство, в котоом хранится ткущий отфильтрованный списко задач
      filteredTodos: [],
    };
  },
  methods: {
// setFilteredTodos - метод, принимающий отфильтрованный массив задач и обновляет filteredTodos, этот метод вызывается когда из ToDoFilter приходит событие filter
    setFilteredTodos(todos) {
      this.filteredTodos = todos;
    },
  },
// created - это хук жизненного цикла, выполняется при создании компонента. 
  created() {
// запрашиваем все задачи из store хранилища vuex и передаем их в filteredTodos
    this.setFilteredTodos(this.$store.getters.allTodos);
  },
};
</script>

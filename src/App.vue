<template>
  <div id="app">
    <ToDoFilter @filter="setFilteredTodos"/>
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
      filteredTodos: [],
    };
  },
  methods: {
    setFilteredTodos(todos) {
      this.filteredTodos = todos;
    },
  },
  created() {
    this.setFilteredTodos(this.$store.getters.allTodos);
  },
};
</script>

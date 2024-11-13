<template>
    <div>
      <h1>To-Do List</h1>
      <p v-if="status === 'loading'">Loading...</p>
      <p v-if="status === 'error'">Error loading todos</p>
      <p v-if="status === 'idle'">Ready to fetch todos</p>
      <ul v-if="status === 'success'">
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggle="toggleTodo"/>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import TodoItem from './ToDoItem.vue';
  
  export default {
    components: {
      TodoItem,
    },
    computed: {
      ...mapGetters(['allTodos', 'fetchStatus']),
      todos() {
        return this.allTodos;
      },
      status() {
        return this.fetchStatus;
      },
    },
    created() {
      this.fetchTodos();
    },
    methods: {
      ...mapActions(['fetchTodos', 'toggleTodoStatus']),
      toggleTodo(id) {
        this.toggleTodoStatus(id);
      },
    },
  };
  </script>
  
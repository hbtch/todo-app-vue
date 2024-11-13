<template>
    <li>
      <label>
        <input type="checkbox" :checked="todo.completed" @change="toggleTodo"/>
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
      </label>
    </li>
  </template>
  
  <script>
  export default {
    props: {
      todo: Object,
    },
    methods: {
      toggleTodo() {
        this.$emit('toggle', this.todo.id);
      },
    },
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  
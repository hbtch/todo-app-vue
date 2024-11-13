<template>
    <div>
      <button @click="showAll">All</button>
      <button @click="showActive">Active</button>
      <button @click="showCompleted">Completed</button>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['allTodos', 'activeTodos', 'completedTodos']),
    },
    methods: {
      showAll() {
        this.$emit('filter', this.allTodos);
      },
      showActive() {
        this.$emit('filter', this.activeTodos);
      },
      showCompleted() {
        this.$emit('filter', this.completedTodos);
      },
    },
  };
  </script>
  
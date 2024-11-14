<template>
  <div id="app">
    <ToDo :todos="filteredTodos"/>
  </div>
</template>

<script>
import ToDo from './components/ToDo.vue';

export default {
  components: {
    ToDo,
  },
};
</script>

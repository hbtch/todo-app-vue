<template>
    <div>
        <button @click="showAll">All</button>
        <button @click="showActive">Active</button>
        <button @click="showCompleted">Completed</button>
        </div>
    </template>
    
    <script>
// mapGetters это хелпер из vuex, упрощает доступ к геттерам vuex и связывает их с computed
    import { mapGetters } from 'vuex';
    
    export default {
        computed: {
//  подключаем геттеры
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
    
<template>
    <div class="filter-container">
        <button @click="showAll" class="filter-button">All</button>
        <button @click="showActive" class="filter-button">Active</button>
        <button @click="showCompleted" class="filter-button">Completed</button>
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

<style scoped>
.filter-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

.filter-button {
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background-color: #f0f0f0;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.filter-button:hover {
    background-color: #4caf50;
    color: white;
}

.filter-button:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>
<template>
    <div class="filter-container">
        <button @click="showAll" class="filter-button">All</button>
        <button @click="showActive" class="filter-button">Active</button>
        <button @click="showCompleted" class="filter-button">Completed</button>
    </div>
</template>
    
<script>
export default {
    methods: {
        showAll() {
            this.$emit('filter', null); // передаем 'null' для всех задач
        },
        showActive() {
            this.$emit('filter', 'active'); // передаем 'active' для активных задач
        },
        showCompleted() {
            this.$emit('filter', 'completed'); // передаем 'completed' для завершенных задач
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

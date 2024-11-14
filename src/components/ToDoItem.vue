<!-- Этот компонент отвечает за отображение одной задачи (тудушки) -->
<template>
    <li class="todo-item">
        <label class="todo-label">
            <input type="checkbox" :checked="todo.completed" @change="toggleTodo" class="todo-checkbox" />
            <span :class="{ completed: todo.completed }" class="todo-text">{{ todo.title }}</span>
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
.todo-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #e0e0e0;
    transition: background-color 0.3s;
}

.todo-item:hover {
    background-color: #f9f9f9;
}

.todo-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
}

.todo-checkbox {
    margin-right: 10px;
    cursor: pointer;
}

.todo-text {
    font-size: 16px;
    color: #333;
    transition: color 0.3s, text-decoration 0.3s;
}

.todo-text.completed {
    color: #888;
    text-decoration: line-through;
}
</style>

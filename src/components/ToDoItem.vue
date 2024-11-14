<!-- Этот компонент отвечает за отображение одной задачи (тудушки) -->
<template>
    <li class="todo-item">
        <label class="todo-label">
            <input type="checkbox" :checked="todo.completed" @change="toggleTodo" class="todo-checkbox" />
            <span v-if="!isEditing" :class="{ completed: todo.completed }" class="todo-text">{{ todo.title }}</span>
            <input
                v-else
                type="text"
                v-model="editedTitle"
                @keyup.enter="saveEdit"
                @blur="cancelEdit"
                class="todo-input"
            />
        </label>
        <button v-if="!isEditing" @click="editTodo" class="edit-button">Edit</button>
    </li>
</template>

<script>
export default {
    props: {
        todo: Object,
    },
    data() {
        return {
            isEditing: false,
            // Начальное значение поля редактирования
            editedTitle: this.todo.title, 
        };
    },
    methods: {
        toggleTodo() {
            this.$emit('toggle', this.todo.id);
        },
        editTodo() {
            // Включаем режим редактирования
            this.isEditing = true; 
            // Загружаем текущее название задачи
            this.editedTitle = this.todo.title; 
        },
        saveEdit() {
            if (this.editedTitle.trim()) {
                this.$emit('edit', { id: this.todo.id, newTitle: this.editedTitle.trim() });
                // Выходим из режима редактирования
                this.isEditing = false; 
            }
        },
        cancelEdit() {
            // Выходим из режима редактирования без сохранения
            this.isEditing = false; 
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

.edit-button {
    margin-left: auto;
    background-color: transparent;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
}

.todo-input {
    font-size: 16px;
    padding: 2px 4px;
    flex-grow: 1;
}
</style>

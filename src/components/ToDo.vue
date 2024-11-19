<template>
    <div class="todo-container">
        <h1 class="todo-header">ToDo List</h1>
        <ToDoFilter @filter="setFilter" />
        <div class="todo-content">
            <div class="todo-input-container">
                <input 
                    v-model="newTodo" 
                    placeholder="Введите новую задачу" 
                    class="todo-input" 
                    @keydown.enter="addTodo" 
                />
                <button @click="addTodo" class="todo-button">Добавить</button>
            </div>
            
            <p v-if="status === 'loading'" class="status-message loading">Загрузка...</p>
            <p v-if="status === 'error'" class="status-message error">Ошибка загрузки задач</p>
            <p v-if="status === 'idle'" class="status-message idle">Готово к загрузке задач</p>
            
            <ul v-if="status === 'success'" class="todo-list">
                <TodoItem 
                    v-for="todo in filteredTodos" 
                    :key="todo.id" 
                    :todo="todo" 
                    @toggle="toggleTodo(todo.id)" 
                    @edit="editTodoTitle"
                />
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TodoItem from './ToDoItem.vue';
import ToDoFilter from './ToDoFilter.vue';

export default {
    components: {
        TodoItem,
        ToDoFilter,
    },
    data() {
        return {
            newTodo: '', // Для ввода текста новой задачи
            currentFilter: null, // Хранение текущего фильтра
            isEditing: null, // Идентификатор редактируемой задачи
            editedTitle: '', // Отредактированное название задачи
        };
    },
    computed: {
        ...mapGetters(['allTodos', 'fetchStatus', 'activeTodos', 'completedTodos']),
        status() {
            return this.fetchStatus;
        },
        filteredTodos() {
            if (this.currentFilter === 'active') {
                return this.activeTodos;
            }
            if (this.currentFilter === 'completed') {
                return this.completedTodos;
            }
            return this.allTodos;
        },
    },
    created() {
        this.fetchTodos();
    },
    methods: {
        ...mapActions(['fetchTodos', 'toggleTodoStatus', 'addNewTodo', 'editTodoTitle']),
        
        toggleTodo(id) {
            this.toggleTodoStatus(id);
        },
        
        addTodo() {
            const trimmedTodo = this.newTodo.trim();
            if (trimmedTodo) {
                this.addNewTodo({ title: trimmedTodo, completed: false });
                this.newTodo = ''; // Очистка поля ввода
            }
        },

        setFilter(filter) {
            this.currentFilter = filter;
        },

        // Метод редактирования задачи
        editTodo(todo) {
            this.isEditing = todo.id; // Запоминаем ID редактируемой задачи
            this.editedTitle = todo.title; // Загружаем текущее название задачи
        },

        // Сохранение изменений
        saveEdit() {
            const trimmedTitle = this.editedTitle.trim();
            if (trimmedTitle) {
                this.editTodoTitle({ id: this.isEditing, newTitle: trimmedTitle });
                this.isEditing = null; // Окончание редактирования
            } else {
                this.cancelEdit();
            }
        },

        // Отмена редактирования
        cancelEdit() {
            this.isEditing = null;
            this.editedTitle = ''; // Очистить отредактированное название
        },
    },
};
</script>

<style scoped>
.todo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.todo-header {
    color: #333;
    margin-bottom: 20px;
    text-align: center;
}

.todo-content {
    width: 100%;
    max-width: 700px;
    padding: 0 20px;
}

.todo-input-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    width: 100%;
}

.todo-input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.todo-button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.todo-button:hover {
    background-color: #45a049;
}

.status-message {
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
}

.status-message.loading {
    color: #ffa500;
}

.status-message.error {
    color: red;
}

.status-message.idle {
    color: #008CBA;
}

.todo-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
</style>

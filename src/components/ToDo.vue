<template>
    <div class="todo-container">
        <h1 class="todo-header">ToDo List</h1>
        <ToDoFilter @filter="setFilter" />
        <div class="todo-content">
            <div class="todo-input-container">
                <input v-model="newTodo" placeholder="Введите новую задачу" class="todo-input" />
                <button @click="addTodo" class="todo-button">Добавить</button>
            </div>
            
            <p v-if="status === 'loading'" class="status-message loading">Loading...</p>
            <p v-if="status === 'error'" class="status-message error">Error loading todos</p>
            <p v-if="status === 'idle'" class="status-message idle">Ready to fetch todos</p>
            
            <ul v-if="status === 'success'" class="todo-list">
<!-- :todo="todo" передача отдельной задачи как проп-->
<!-- @toggle="toggleTodo обработка события чтобы переключить статус задачи -->
                <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @toggle="toggleTodo" />
            </ul>
        </div>
    </div>
</template>

<script>
// это хелперы из vuex, они позволяют подключать геттеры и экшены из vuex-хранилища
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
            currentFilter: null, // Свойство для хранения текущего фильтра
        };
    },
    computed: {
// allTodos возвращает массив всех задач из хранилища
// fetchStatus возвращает текущий статус загрузки задач
        ...mapGetters(['allTodos', 'fetchStatus', 'activeTodos', 'completedTodos']),
        todos() {
            return this.allTodos;
        },
        status() {
            return this.fetchStatus;
        },
        filteredTodos() {
            if (this.currentFilter === 'active') {
                return this.activeTodos;
            } else if (this.currentFilter === 'completed') {
                return this.completedTodos;
            }
            return this.allTodos;
        }
    },
// created инициирует загрузку задач из vuex
    created() {
        this.fetchTodos();
    },
// подключаем vuex экшены, fetchTodos загружает задачи из хранилища, toggleTodoStatus меняет статус задачи
    methods: {
        ...mapActions(['fetchTodos', 'toggleTodoStatus', 'addNewTodo']),
// toggleTodo вызывается когда происходит событие toggle
        toggleTodo(id) {
            this.toggleTodoStatus(id);
        },
        addTodo() {
            if (this.newTodo.trim()) {
                this.addNewTodo({ title: this.newTodo, completed: false });
                this.newTodo = ''; // Очистка поля ввода после добавления
            }
        },
        // Устанавливаем текущий фильтр на основе выбранного фильтра
        setFilter(filterTodos) {
        if (filterTodos === this.allTodos) {
            this.currentFilter = null;
        } else if (filterTodos === this.activeTodos) {
            this.currentFilter = 'active';
        } else if (filterTodos === this.completedTodos) {
            this.currentFilter = 'completed';
        }
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
    padding-left: 20px; 
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
    border-radius: 20px;
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
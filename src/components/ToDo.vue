<template>
    <div>
        <h1>ToDo List</h1>
        <ToDoFilter @filter="setFilter" />
        <input v-model="newTodo" placeholder="Введите новую задачу" />
        <button @click="addTodo">Добавить</button>
        <p v-if="status === 'loading'">Loading...</p>
        <p v-if="status === 'error'">Error loading todos</p>
        <p v-if="status === 'idle'">Ready to fetch todos</p>
        <ul v-if="status === 'success'">
<!-- :todo="todo" передача отдельной задачи как проп-->
<!-- @toggle="toggleTodo обработка события чтобы переключить статус задачи -->
            <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @toggle="toggleTodo"/>
        </ul>
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
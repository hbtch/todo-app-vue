import Vue from 'vue';
import Vuex from 'vuex';
import todosData from '../../todos.json';

Vue.use(Vuex);

export default new Vuex.Store({
// state — объект, в котором храним состояние приложения
    state: {
        todos: todosData.slice(0, 5), // Загружаем первые 5 задач из JSON-файла
        newTodo: '',
        filter: '',
        status: 'idle' // Устанавливаем начальный статус
    },
    // getters —  для доступа к данным в state
    getters: {
        allTodos: state => state.todos, // пример геттера для доступа к списку задач
        activeTodos: state => state.todos.filter(todo => !todo.completed),
        completedTodos: state => state.todos.filter(todo => todo.completed),
        fetchStatus: state => state.status,
    },
    // actions — асинхронные операции, которые вызываются из компонентов
    actions: {
        fetchTodos({ commit }) {
            commit('setStatus', 'loading');
    // Здесь выполняется асинхронная логика
            setTimeout(() => {
                try {
                // Попробуем загрузить данные
                commit('setTodos', todosData.slice(0, 5));
                commit('setStatus', 'success');
                } catch (error) {
                // Если произойдет ошибка
                console.error('Ошибка загрузки данных:', error);
                commit('setStatus', 'error');
                }
            }, 1000);
        },
        addNewTodo({ commit }, todo) {
            // Генерация уникального ID и добавление задачи в хранилище
            const newTodo = { ...todo, id: Date.now() };
            commit('addTodo', newTodo);
        },
        toggleTodoStatus({ commit }, id) {
            commit('toggleTodo', id);
        },
    },
    // mutations — синхронные функции, которые изменяют state
    mutations: {
        setTodos(state, todos) {
        state.todos = todos; // изменяем состояние списка задач
        },
        setStatus(state, status) {
            state.status = status;
        },
        addTodo(state, todo) {
            state.todos.push(todo); // Добавляем новую задачу в массив задач
        },
        toggleTodo(state, id) {
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },
});
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
// state — объект, в котором храним состояние приложения
    state: {
        todos: [],
        newTodo: '',
        filter: ''
    },
    // getters —  для доступа к данным в state
    getters: {
        allTodos: state => state.todos, // пример геттера для доступа к списку задач
    },
    // actions — асинхронные операции, которые вызываются из компонентов
    actions: {
        fetchTodos({ commit }) {
        // Здесь выполняется асинхронная логика
        const todos = [{ id: 1, title: 'Sample Todo', completed: false }];
        commit('setTodos', todos); // вызываем мутацию и передаем данные
        },
    },
    // mutations — синхронные функции, которые изменяют state
    mutations: {
        setTodos(state, todos) {
        state.todos = todos; // изменяем состояние списка задач
        },
    },
})
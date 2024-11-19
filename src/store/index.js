import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: [], // Начальное состояние - пустой массив задач
        newTodo: '',
        filter: '',
        status: 'idle', // Статус загрузки данных
    },
    getters: {
        allTodos: state => state.todos,
        activeTodos: state => state.todos.filter(todo => !todo.completed),
        completedTodos: state => state.todos.filter(todo => todo.completed),
        fetchStatus: state => state.status, // Статус загрузки
    },
    actions: {
        // Действие для получения задач с API
        async fetchTodos({ commit }) {
        commit('setStatus', 'loading'); // Устанавливаем статус загрузки
            try {
                // Выполняем запрос к API для получения задач
                const response = await axios.get('https://jsonplaceholder.typicode.com/users/1/todos');
                
                // Ограничиваем количество задач до 5
                const limitedTodos = response.data.slice(0, 5);
                
                // После получения данных, обновляем состояние
                commit('setTodos', limitedTodos);
                commit('setStatus', 'success'); // Устанавливаем статус успешной загрузки
            } catch (error) {
                // Обрабатываем ошибку, если запрос не удался
                console.error('Ошибка загрузки данных:', error);
                commit('setStatus', 'error'); // Устанавливаем статус ошибки
            }
        },
    // Действие для добавления новой задачи
    addNewTodo({ commit }, todo) {
      const newTodo = { ...todo, id: Date.now() }; // Генерация уникального ID
      commit('addTodo', newTodo); // Добавляем новую задачу
    },
    // Действие для переключения статуса задачи
    toggleTodoStatus({ commit }, id) {
      commit('toggleTodo', id); // Переключаем статус задачи
    },
    // Действие для редактирования заголовка задачи
    editTodoTitle({ commit }, { id, newTitle }) {
      commit('updateTodoTitle', { id, newTitle }); // Обновляем заголовок задачи
    }
  },
  mutations: {
    // Мутация для обновления списка задач
    setTodos(state, todos) {
      state.todos = todos; // Обновляем список задач
    },
    // Мутация для установки статуса загрузки
    setStatus(state, status) {
      state.status = status; // Устанавливаем статус загрузки
    },
    // Мутация для добавления новой задачи
    addTodo(state, todo) {
      state.todos.push(todo); // Добавляем новую задачу в массив
    },
    // Мутация для переключения статуса задачи
    toggleTodo(state, id) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed; // Переключаем статус завершенности задачи
      }
    },
    // Мутация для обновления заголовка задачи
    updateTodoTitle(state, { id, newTitle }) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.title = newTitle; // Обновляем заголовок задачи
      }
    },
  },
});

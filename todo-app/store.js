import Vue from 'vue'
import Vuex from 'vuex'
import { tomorrow } from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: 0,
     todos: [
      {
        icon: 'user',
        name: 'Personal',
        tasks: [
          {
            id: 1,
            title: 'Dating',
            date: new Date(),
            done: false,
            deleted: false
          }
        ],
        colors: ['#ff6262', '#ffa947']
      },
      {
        icon: 'suitcase',
        name: 'Work',
        tasks: [
          {
            id: 3,
            title: 'Design Sprint',
            date: new Date(),
            done: true,
            deleted: false
          },
          {
            id: 4,
            title: 'Icon Set Design for Mobile App',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 5,
            title: 'HTML/CSS Study',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 6,
            title: 'Weekly Report',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 7,
            title: 'Design Meeting',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            title: 'Quick Prototyping',
            date: new Date('2019-09-29'),
            done: false,
            deleted: false
          },
          {
            id: 8,
            title: 'UX Conference',
            date: new Date('2019-09-16'),
            done: false,
            deleted: false
          }
        ],
        colors: ['#5b9df9', '#47bfff']
      },
      {
        icon: 'home',
        name: 'Home',
        tasks: [
          {
            id: 2,
            title: 'House Keeping',
            date: new Date(),
            done: true,
            deleted: false
          }
        ],
        colors: ['#2c7d59', '#3ba776']
      }
    ],
     //JSON.parse(window.localStorage.getItem('toggles')  || '[]'), //[{ icon: 'user',name: 'Personal',tasks: [{id: 1,title: 'Dating',date: new Date(),done: false,deleted: false}], colors: ['#ff6262', '#ffa947']}],
    selected: null,
    unselect: null,
    editing: null,
    colors: [{colors:['#ff6262', '#ffa947']}],
    adding: null
  },
  getters: {
    currentTodo (state) {
      return state.todos[state.currentIndex]
    },
    todayTasks (state) {
      const tasks = []
      state.todos.forEach(todo => {
        todo.tasks.forEach(task => {
          if (task.date <= tomorrow && !task.done && !task.deleted) {
            tasks.push(task)
          }
        })
      })
      return tasks
    }
  },
  mutations: {
    set: (state, payload) => {
      state = Object.assign(state, payload);
    },
    selectTodo (state, selected) {
      state.unselect = null
      state.selected = selected
    },
    unselectTodo (state) {
      state.unselect = state.selected
      state.selected = null
    },
    nextTodo (state) {
      if (state.currentIndex < state.todos.length - 1) {
        state.currentIndex++
      }
    },
    prevTodo (state) {
      if (state.currentIndex > 0) {
        state.currentIndex--
      }
    },
    deleteTask (_, { task }) {
      task.deleted = true
    },
    toggleEditing (state) {
      console.log(state);
      if (state.editing && state.editing.text) {
        state.selected.todo.tasks.unshift({
          title: state.editing.text,
          date: new Date(),
          done: false,
          deleted: false
        })
      }
      state.editing = state.editing ? null : { text: '' }
      console.log(state.editing);
    },
    toggleAdding (state) {
      const appRect = document.querySelector('#app').getBoundingClientRect()
      // const elRect = this.$el.getBoundingClientRect()
      const rect = {}
      rect.top = 0 - 0
      rect.left = 0 - 0
      rect.width = 0
      rect.height = 0
      rect.appWidth = 0
      rect.appHeight = 0
      state.selected = {'rect':rect,'todo':state.todos[0]};
      state.adding = state.adding ? null : { text: '' }
    },
    togglequickAdding (state) {
      if (state.adding && state.adding.text) {
        state.selected.todo.tasks.unshift({
          title: state.adding.text,
          date: new Date(),
          done: false,
          deleted: false
        })
      }
        // console.log(JSON.parse(window.localStorage.getItem('asdf')));
        // if(state.adding){
        //       state.todos.push({
        //             icon: 'user', name: state.adding.text,
        //             tasks: [],
        //             colors: ['#ff6262', '#ffa947']
        //       });
        // }
        state.adding = state.adding ? null : { text: '' }
        state.unselect = state.selected
        state.selected = null
    },
  },
  actions: {
    
  }
})

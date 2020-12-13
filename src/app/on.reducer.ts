import * as App from './app.state'
import {Actions, addTodo, changeMood, removeTodo, selectList, toggleTodo} from './app.actions'
import {undoRedo, produceOn} from 'ngrx-wieder'
import {nextId} from './todo'
import {on} from '@ngrx/store'
import {activeList} from './app.state'

const {createSegmentedUndoRedoReducer} = undoRedo({
  track: true,
  allowedActionTypes: [
    addTodo.type,
    toggleTodo.type,
    removeTodo.type,
    changeMood.type
  ],
  mergeActionTypes: [
    changeMood.type
  ]
})

const reducer = createSegmentedUndoRedoReducer(App.initial, state => state.activeList,
    on(addTodo, (state, {text}) => {
      activeList(state).todos.push({id: nextId(), text, checked: false})
      return state
    }),
    on(toggleTodo, (state, {id}) => {
      const todo = activeList(state).todos.find(t => t.id === id)
      todo.checked = !todo.checked
      return state
    }),
    on(removeTodo, (state, {id}) => {
      const list = activeList(state)
      list.todos.splice(list.todos.findIndex(t => t.id === id), 1)
      return state
    }),
    on(changeMood, (state, {mood}) => {
      activeList(state).mood = mood
      return state
    }),
    produceOn(selectList, (state, {id}) => {
      state.activeList = id
    })
)

export function appReducer(state, action: Actions) {
  return reducer(state, action)
}

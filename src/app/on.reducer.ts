import * as App from './app.state'
import {Actions, addTodo, changeMood, removeTodo, toggleTodo} from './app.actions'
import {undoRedo} from 'ngrx-wieder'
import {nextId} from './todo'
import {on} from '@ngrx/store'

const {createUndoRedoReducer} = undoRedo({
  track: true,
  mergeActionTypes: [
    changeMood.type
  ]
})

const reducer = createUndoRedoReducer(App.initial,
    on(addTodo, (state, {text}) => {
      state.todos.push({id: nextId(), text, checked: false})
      return state
    }),
    on(toggleTodo, (state, {id}) => {
      const todo = state.todos.find(t => t.id === id)
      todo.checked = !todo.checked
      return state
    }),
    on(removeTodo, (state, {id}) => {
      state.todos.splice(state.todos.findIndex(t => t.id === id), 1)
      return state
    }),
    on(changeMood, (state, {mood}) => {
      state.mood = mood
      return state
    })
)

export function appReducer(state, action: Actions) {
  return reducer(state, action)
}

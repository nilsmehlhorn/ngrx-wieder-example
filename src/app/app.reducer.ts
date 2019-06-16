import * as App from './app.state'
import {Actions, addTodo, toggleTodo, changeMood, removeTodo} from './app.actions'
import {produce, PatchListener} from 'immer'
import {undoRedo} from 'ngrx-wieder'
import {id} from './todo'

const reducer = (state, action: Actions, listener?: PatchListener) =>
  produce(state, next => {
    switch (action.type) {
      case addTodo.type:
        next.todos.push({id: id(), text: action.text, checked: false})
        return
      case toggleTodo.type:
        const todo = next.todos.find(t => t.id === action.id)
        todo.checked = !todo.checked
        return
      case removeTodo.type:
        next.todos.splice(next.todos.findIndex(t => t.id === action.id), 1)
        return
      case changeMood.type:
        next.mood = action.mood
        return
      default:
        return
    }
}, listener)

const undoableReducer = undoRedo({
  track: true,
  mergeActionTypes: [
    changeMood.type
  ]
})(reducer)

export function appReducer(state = App.initial, action: Actions) {
  return undoableReducer(state, action)
}
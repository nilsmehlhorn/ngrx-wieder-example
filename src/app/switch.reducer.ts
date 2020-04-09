import * as App from './app.state'
import {Actions, addTodo, toggleTodo, changeMood, removeTodo} from './app.actions'
import {produce, PatchListener} from 'immer'
import {undoRedo} from 'ngrx-wieder'
import {nextId} from './todo'

const {wrapReducer} = undoRedo({
  track: true,
  mergeActionTypes: [
    changeMood.type
  ]
})

const reducer = (state, action: Actions, listener?: PatchListener) =>
  produce(state, next => {
    switch (action.type) {
      case addTodo.type:
        next.todos.push({id: nextId(), text: action.text, checked: false})
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

const undoableReducer = wrapReducer(reducer)

export function appReducer(state = App.initial, action: Actions) {
  return undoableReducer(state, action)
}

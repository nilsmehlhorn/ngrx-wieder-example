import * as App from './app.state'
import {Actions, addTodo, toggleTodo, changeMood, removeTodo, selectList} from './app.actions'
import {produce, PatchListener} from 'immer'
import {undoRedo} from 'ngrx-wieder'
import {nextId} from './todo'
import { getActiveList } from './app.selectors'

const {wrapReducer} = undoRedo({
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

const reducer = (state, action: Actions, listener?: PatchListener) =>
  produce(state, next => {
    switch (action.type) {
      case addTodo.type:
        getActiveList(next).todos.push({id: nextId(), text: action.text, checked: false})
        return
      case toggleTodo.type:
        const todo = getActiveList(next).todos.find(t => t.id === action.id)
        todo.checked = !todo.checked
        return
      case removeTodo.type:
        const list = getActiveList(next)
        list.todos.splice(list.todos.findIndex(t => t.id === action.id), 1)
        return
      case changeMood.type:
        getActiveList(next).mood = action.mood
        return
      case selectList.type:
        next.activeList = action.id
        return
      default:
        return
    }
}, listener)

const undoableReducer = wrapReducer(reducer, state => state.activeList)

export function appReducer(state = App.initial, action: Actions) {
  return undoableReducer(state, action)
}

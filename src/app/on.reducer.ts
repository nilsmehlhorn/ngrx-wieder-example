import { on } from '@ngrx/store'
import { produceOn, undoRedo } from 'ngrx-wieder'
import { Actions, addTodo, changeMood, removeTodo, selectList, toggleTodo } from './app.actions'
import { getActiveList } from './app.selectors'
import * as App from './app.state'
import { nextId } from './todo'

const {createSegmentedUndoRedoReducer} = undoRedo({
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
      getActiveList(state).todos.push({id: nextId(), text, checked: false})
      return state
    }),
    on(toggleTodo, (state, {id}) => {
      const todo = getActiveList(state).todos.find(t => t.id === id)
      todo.checked = !todo.checked
      return state
    }),
    on(removeTodo, (state, {id}) => {
      const list = getActiveList(state)
      list.todos.splice(list.todos.findIndex(t => t.id === id), 1)
      return state
    }),
    on(changeMood, (state, {mood}) => {
      getActiveList(state).mood = mood
      return state
    }),
    produceOn(selectList, (state, {id}) => {
      state.activeList = id
    })
)

export function appReducer(state, action: Actions) {
  return reducer(state, action)
}

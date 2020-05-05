import {Todo, nextId} from './todo'
import {createSelector} from '@ngrx/store'
import * as Root from './store'

export interface TodoList {
  id: string
  name: string
  todos: Todo[]
  mood: number
}

export interface State {
  activeList: string
  lists: { [id: string]: TodoList }
  canUndo: boolean
  canRedo: boolean
}

const listOne = {
  id: nextId(),
  name: 'Personal',
  todos: [
    {id: nextId(), text: 'Travel', checked: true},
    {id: nextId(), text: 'Relax', checked: false}
  ],
  mood: 70
}

const listTwo = {
  id: nextId(),
  name: 'Work',
  todos: [
    {id: nextId(), text: 'Finish Project A', checked: true},
    {id: nextId(), text: 'Write proposal', checked: false},
    {id: nextId(), text: 'Design dashboard', checked: false}
  ],
  mood: 70
}

export const initial: State = {
  lists: {
    [listOne.id]: listOne,
    [listTwo.id]: listTwo
  },
  activeList: listOne.id,
  canUndo: false,
  canRedo: false
}


export const activeList = (state: State): TodoList => state.lists[state.activeList]

export const selectActiveList = createSelector(
    ({app}: Root.State) => app.activeList,
    ({app}: Root.State) => app.lists,
    (active, lists) => lists[active]
)

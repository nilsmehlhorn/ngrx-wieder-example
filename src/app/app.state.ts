import { initialUndoRedoState, UndoRedoState } from 'ngrx-wieder'
import { nextId, Todo } from './todo'
export interface TodoList {
  id: string
  name: string
  todos: Todo[]
  mood: number
}

export interface State extends UndoRedoState {
  activeList: string
  lists: { [id: string]: TodoList }
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
  ...initialUndoRedoState
}


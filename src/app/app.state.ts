import {Todo, nextId} from './todo'

export interface State {
  todos: Todo[]
  mood: number
  canUndo: boolean
  canRedo: boolean
}

export const initial: State = {
  todos: [
    {id: nextId(), text: 'Travel', checked: true},
    {id: nextId(), text: 'Relax', checked: false},
    {id: nextId(), text: 'Work', checked: false}
  ],
  mood: 70,
  canUndo: false,
  canRedo: false
}

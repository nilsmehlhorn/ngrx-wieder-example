import {Todo, id} from './todo'

export interface State {
  todos: Todo[]
  mood: number
  canUndo: boolean
  canRedo: boolean
}

export const initial: State = {
  todos: [
    {id: id(), text: 'Travel', checked: true},
    {id: id(), text: 'Relax', checked: false},
    {id: id(), text: 'Work', checked: false}
  ],
  mood: 70,
  canUndo: false,
  canRedo: false
}
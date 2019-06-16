import {Component} from '@angular/core'
import {Store} from '@ngrx/store'
import {State} from './store'
import {addTodo, changeMood, removeTodo, toggleTodo} from './app.actions'
import {Todo} from './todo'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly mood$ = this.store.select(state => state.app.mood)

  readonly todos$ = this.store.select(state => state.app.todos)

  readonly disableUndo$ = this.store.select(state => !state.app.canUndo)

  readonly disableRedo$ = this.store.select(state => !state.app.canRedo)

  constructor(private readonly store: Store<State>) {
  }

  add(text: string): void {
    this.store.dispatch(addTodo({text}))
  }

  toggle({id}: Todo): void {
    this.store.dispatch(toggleTodo({id}))
  }

  remove({id}: Todo): void {
    this.store.dispatch(removeTodo({id}))
  }

  moodChange() {
    this.store.dispatch({ type: 'BREAK_MERGE' })
  }

  moodInput(mood: number) {
    this.store.dispatch(changeMood({mood}))
  }

  undo(): void {
    this.store.dispatch({type: 'UNDO'})
  }

  redo(): void {
    this.store.dispatch({type: 'REDO'})
  }
}

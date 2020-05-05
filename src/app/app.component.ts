import {ChangeDetectionStrategy, Component} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {State} from './store'
import {addTodo, changeMood, removeTodo, selectList, toggleTodo} from './app.actions'
import {Todo} from './todo'
import {selectActiveList} from './app.state'
import {map} from 'rxjs/operators'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  readonly lists$ = this.store.select(state => state.app.lists)
      .pipe(map(lists => Object.values(lists)))

  readonly activeList$ = this.store.select(selectActiveList)

  readonly mood$ = this.store.select(selectActiveList)
      .pipe(select(list => list.mood))

  readonly todos$ = this.store.select(selectActiveList)
      .pipe(select(list => list.todos))

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
    this.store.dispatch({type: 'BREAK_MERGE'})
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

  selectList(id: string): void {
    this.store.dispatch(selectList({id}))
  }
}

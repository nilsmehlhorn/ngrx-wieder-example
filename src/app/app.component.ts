import { ChangeDetectionStrategy, Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import {
  addTodo,
  changeMood,
  removeTodo,
  selectList,
  toggleTodo,
} from "./app.actions";
import * as fromTodo from "./app.selectors";
import { State } from "./store";
import { Todo } from "./todo";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly lists$ = this.store
    .select((state) => state.app.lists)
    .pipe(map((lists) => Object.values(lists)));

  readonly activeList$ = this.store.select(fromTodo.selectActiveList);

  readonly mood$ = this.store
    .select(fromTodo.selectActiveList)
    .pipe(select((list) => list.mood));

  readonly todos$ = this.store
    .select(fromTodo.selectActiveList)
    .pipe(select((list) => list.todos));

  readonly disableUndo$ = this.store
    .select(fromTodo.selectCanUndo)
    .pipe(map((canUndo) => !canUndo));

  readonly disableRedo$ = this.store
    .select(fromTodo.selectCanRedo)
    .pipe(map((canRedo) => !canRedo));

  constructor(private readonly store: Store<State>) {}

  add(text: string): void {
    this.store.dispatch(addTodo({ text }));
  }

  toggle({ id }: Todo): void {
    this.store.dispatch(toggleTodo({ id }));
  }

  remove({ id }: Todo): void {
    this.store.dispatch(removeTodo({ id }));
  }

  moodChange() {
    this.store.dispatch({ type: "BREAK_MERGE" });
  }

  moodInput(mood: number) {
    this.store.dispatch(changeMood({ mood }));
  }

  undo(): void {
    this.store.dispatch({ type: "UNDO" });
  }

  redo(): void {
    this.store.dispatch({ type: "REDO" });
  }

  selectList(id: string): void {
    this.store.dispatch(selectList({ id }));
  }
}

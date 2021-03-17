import { createSelector } from "@ngrx/store";
import { createHistorySelectors } from "ngrx-wieder";
import * as Todo from "./app.state";
import * as Root from "./store";

export const selectFeature = (state: Root.State) => state.app;

export const getActiveList = (state: Todo.State): Todo.TodoList =>
  state.lists[state.activeList];

export const selectActiveList = createSelector(selectFeature, getActiveList);

export const { selectCanUndo, selectCanRedo } = createHistorySelectors<
  Root.State,
  Todo.State
>(selectFeature, state => state.activeList);

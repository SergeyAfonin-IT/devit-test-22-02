import { createSelector } from "reselect";

const baseState = (state) => state.tasks;

export const isLoadingSelector = createSelector(
  baseState,
  (state) => state.isLoading
);

export const isLoadedSelector = createSelector(
  baseState,
  (state) => state.isLoaded
);

export const tasksSelector = createSelector(baseState, (state) => state.tasks);

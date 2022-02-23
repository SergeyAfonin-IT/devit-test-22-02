import { combineActions, handleActions } from "redux-actions";

import { TasksState } from "../../interfaces";

import { addTaskAction, deleteTaskAction, fetchTasksAction } from "./actions";

const initialState: TasksState = {
  isLoading: false,
  isLoaded: false,
  tasks: [],
};

const requestHandler = (state: TasksState) => ({
  ...state,
  isLoading: true,
});

const fetchTasksSuccessHandler = (
  state: TasksState,
  { payload: { data: tasks = [] } }
) => ({
  ...state,
  tasks: tasks || [],
  isLoading: false,
  isLoaded: true,
});

const addTaskSuccessHandler = (
  state: TasksState,
  { payload }
) => {
  const tasks = state.tasks;
  const task = payload.data;

  return {
    ...state,
    tasks: [...tasks, task],
    isLoading: false,
  }
};

const deleteTaskSuccessHandler = (state: TasksState, { payload }) => {
  const newTasks = payload.data.value !== null ? state.tasks.filter((item) => item.id !== payload.data.id) : state.tasks

  return {
    ...state,
    tasks: newTasks,
    isLoading: false,
  }
};

const requestFailHandler = (state: TasksState) => {
  return {
    ...state,
    isLoading: false,
  };
};

export const tasks = handleActions(
  {
    [combineActions(fetchTasksAction, addTaskAction, deleteTaskAction) as any]:
      requestHandler,
    [combineActions(fetchTasksAction.success) as any]: fetchTasksSuccessHandler,
    [combineActions(addTaskAction.success) as any]: addTaskSuccessHandler,
    [combineActions(deleteTaskAction.success) as any]: deleteTaskSuccessHandler,
    [combineActions(
      fetchTasksAction.fail,
      addTaskAction.fail,
      deleteTaskAction.fail
    ) as any]: requestFailHandler,
  },
  { ...initialState }
);

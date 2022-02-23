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
  { payload: { data: tasks = [] } }
) => ({
  ...state,
  tasks: tasks || [],
  isLoading: false,
});

const deleteTaskSuccessHandler = (state: TasksState, { payload }) => ({
  ...state,
  tasks: state.tasks.filter((item) => item.id !== payload.data.id),
  isLoading: false,
});

const requestFailHandler = (state: TasksState) => {
  console.log("requestFailHandler");

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

import { TaskPayload } from "../../interfaces";

import { addTaskAction, deleteTaskAction, fetchTasksAction } from "./actions";

export const fetchTasks = () => async (dispatch: any) =>
  dispatch(fetchTasksAction());

export const addTask = (task: TaskPayload) => async (dispatch: any) =>
  dispatch(addTaskAction(task));

export const deleteTask = (id: string) => async (dispatch: any) =>
  dispatch(deleteTaskAction(id));

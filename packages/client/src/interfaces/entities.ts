import { ActionFunctionAny } from "redux-actions";

export interface TaskItem {
  id: string;
  name: string;
  image: string;
}

export interface TasksState {
  isLoading: boolean;
  isLoaded: boolean;
  tasks: TaskItem[];
}

export interface RequestActionFunction extends ActionFunctionAny<any> {
  fail: string;
  success: string;
}

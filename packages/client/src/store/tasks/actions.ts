import {createRequestAction} from "../common/createRequestAction";
import {TASK_ACTIONS} from "../../constants/actionTypes";

export const fetchTasksAction = createRequestAction(TASK_ACTIONS.FETCH, () => ({
  request: {
    url: "/tasks",
  },
}));

export const addTaskAction = createRequestAction(
  TASK_ACTIONS.ADD,
  (task: FormData) => ({
    request: {
      method: "POST",
      url: "/tasks",
      data: task,
    },
  })
);

export const deleteTaskAction = createRequestAction(
  TASK_ACTIONS.DELETE,
  (id: string) => ({
    request: {
      method: "DELETE",
      url: `/tasks/${id}`,
    },
  })
);

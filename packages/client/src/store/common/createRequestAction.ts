import { createAction } from "redux-actions";

import { RequestActionFunction } from "../../interfaces";

export const createRequestAction = (
  actionType: string,
  payloadCreator: any,
  metaCreator?: any
) => {
  const actionCreator = createAction(
    actionType,
    payloadCreator,
    metaCreator
  ) as RequestActionFunction;
  actionCreator.success = `${actionType}_SUCCESS`;
  actionCreator.fail = `${actionType}_FAIL`;

  return actionCreator;
};

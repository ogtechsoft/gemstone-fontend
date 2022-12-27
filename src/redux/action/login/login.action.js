import {
  POST_LOGIN_DATA_SUCCESS,
  POST_LOGIN_DATA_FAILURE,
} from "../../constants/index";
import { postRequest } from "../../../utilies/apiUtils";

const loginSuccess = (data) => {
  return {
    type: POST_LOGIN_DATA_SUCCESS,
    payload: data,
  };
};

const loginFailure = (data) => {
  return {
    type: POST_LOGIN_DATA_FAILURE,
    payload: {},
  };
};

export const loginDetails = (user) => {
  return async (dispatch, getState) => {
    const { error, result } = await postRequest(`api/admin/login`, user);
    if (!error) {
      return dispatch(loginSuccess(result));
    }
    return dispatch(loginFailure(error));
  };
};

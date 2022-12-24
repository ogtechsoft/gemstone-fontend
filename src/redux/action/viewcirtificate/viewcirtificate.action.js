import {
  VIEW_CERTIFICATE_DATA_SUCCESS,
  VIEW_CERTIFICATE_DATA_FAILURE,
} from "../../constants/index";
import { getRequest } from "../../../utilies/apiUtils";

const viewCertificateSuccess = (data) => {
  return {
    type: VIEW_CERTIFICATE_DATA_SUCCESS,
    payload: data,
  };
};

const viewCertificateFailure = (data) => {
  return {
    type: VIEW_CERTIFICATE_DATA_FAILURE,
    payload: data,
  };
};

export const viewCertificateDetails = (id) => {
  return async (dispatch, getState) => {
    const { error, result } = await getRequest(`api/certificates/${id}`);
    console.log(result, "result");
    if (!error) {
      return dispatch(viewCertificateSuccess(result));
    }
    return dispatch(viewCertificateFailure(error));
  };
};

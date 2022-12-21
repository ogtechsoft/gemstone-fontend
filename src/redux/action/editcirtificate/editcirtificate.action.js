import { PUT_CERTIFICATE_DATA_SUCCESS, POST_CERTIFICATE_DATA_FAILURE } from '../../constants/index';
import { putRequest } from '../../../utilies/apiUtils';

const  editCertificateSuccess = (data) => {
    return{
        type:PUT_CERTIFICATE_DATA_SUCCESS,
        payload:data
    }
}

const  editCertificateFailure = (data) => {
    return{
        type:POST_CERTIFICATE_DATA_FAILURE,
        payload:data
    }
}


export const editCertificateDetails = (user, data) => {
    return async (dispatch, getState) => {
        const { error, result } = await putRequest(`api/certificates/${user}`, data);
        if(!error){
            return dispatch(editCertificateSuccess(result));
        }
        return dispatch(editCertificateFailure(error));
    }
    
}
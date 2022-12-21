import { POST_CERTIFICATE_DATA_SUCCESS, POST_CERTIFICATE_DATA_FAILURE } from '../../constants/index';
import { postRequest } from '../../../utilies/apiUtils';

const  addCertificateSuccess = (data) => {
    return{
        type:POST_CERTIFICATE_DATA_SUCCESS,
        payload:data
    }
}

const  addCertificateFailure = (data) => {
    return{
        type:POST_CERTIFICATE_DATA_FAILURE,
        payload:data
    }
}


export const addCertificateDetails = (user) => {
    return async (dispatch, getState) => {
        const { error, result } = await postRequest(`api/certificates`, user);
        if(!error){
            return dispatch(addCertificateSuccess(result));
        }
        return dispatch(addCertificateFailure(error));
    }
    
}
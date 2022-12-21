import { GET_CERTIFICATE_DATA_SUCCESS, GET_CERTIFICATE_DATA_FAILURE } from '../../constants/index';
import { getRequest } from '../../../utilies/apiUtils';

const  getCertificateSuccess = (data) => {
    return{
        type:GET_CERTIFICATE_DATA_SUCCESS,
        payload:data
    }
}

const  getCertificateFailure = (data) => {
    return{
        type:GET_CERTIFICATE_DATA_FAILURE,
        payload:data
    }
}


export const getCertificateDetails = () => {
    return async (dispatch, getState) => {
        const { error, result } = await getRequest(`api/certificates`);
        if(!error){
            return dispatch(getCertificateSuccess(result));
        }
        return dispatch(getCertificateFailure(error));
    }
    
}
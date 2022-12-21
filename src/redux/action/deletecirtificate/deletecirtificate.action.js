import { DELETE_CERTIFICATE_DATA_SUCCESS, DELETE_CERTIFICATE_DATA_FAILURE } from '../../constants/index';
import { deleteRequest } from '../../../utilies/apiUtils';

const  deleteCertificateSuccess = (data) => {
    return{
        type:DELETE_CERTIFICATE_DATA_SUCCESS,
        payload:data
    }
}

const  deleteCertificateFailure = (data) => {
    return{
        type:DELETE_CERTIFICATE_DATA_FAILURE,
        payload:data
    }
}


export const deleteCertificateDetails = (id) => {
    return async (dispatch, getState) => {
        const { error, result } = await deleteRequest(`api/certificates/${id}`);
        if(!error){
            return dispatch(deleteCertificateSuccess(result));
        }
        return dispatch(deleteCertificateFailure(error));
    }
    
}
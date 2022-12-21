import { PUT_CERTIFICATE_DATA_SUCCESS, PUT_CERTIFICATE_DATA_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

const initState = { data: [], error: false, errorData: "", isLoading: true };

export const editCertificateReducer = (state = initState, action) => {
    switch (action.type) {
        case PUT_CERTIFICATE_DATA_SUCCESS:
        return onSuccess(state, action)

        case PUT_CERTIFICATE_DATA_FAILURE:
            return onFailure(state, action)
    
        default:
            return { ...state } 
    }
}
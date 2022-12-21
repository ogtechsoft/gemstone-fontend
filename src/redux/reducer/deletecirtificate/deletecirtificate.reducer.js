import { DELETE_CERTIFICATE_DATA_SUCCESS, DELETE_CERTIFICATE_DATA_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

const initState = { data: [], error: false, errorData: "", isLoading: true };

export const deleteCertificateReducer = (state = initState, action) => {
    switch (action.type) {
        case DELETE_CERTIFICATE_DATA_SUCCESS:
        return onSuccess(state, action)

        case DELETE_CERTIFICATE_DATA_FAILURE:
            return onFailure(state, action)
    
        default:
            return { ...state } 
    }
}
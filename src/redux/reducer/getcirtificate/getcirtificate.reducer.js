import { GET_CERTIFICATE_DATA_SUCCESS, GET_CERTIFICATE_DATA_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

const initState = { data: [], error: false, errorData: "", isLoading: true };

export const getCertificateReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_CERTIFICATE_DATA_SUCCESS:
        return onSuccess(state, action)

        case GET_CERTIFICATE_DATA_FAILURE:
            return onFailure(state, action)
    
        default:
            return { ...state } 
    }
}
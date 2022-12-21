import { VIEW_CERTIFICATE_DATA_SUCCESS, VIEW_CERTIFICATE_DATA_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

const initState = { data: [], error: false, errorData: "", isLoading: true };

export const viewCertificateReducer = (state = initState, action) => {
    switch (action.type) {
        case VIEW_CERTIFICATE_DATA_SUCCESS:
        return onSuccess(state, action)

        case VIEW_CERTIFICATE_DATA_FAILURE:
            return onFailure(state, action)
    
        default:
            return { ...state } 
    }
}
import { POST_LOGIN_DATA_SUCCESS, POST_LOGIN_DATA_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

const initState = { data: [], error: false, errorData: "", isLoading: true };

export const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case POST_LOGIN_DATA_SUCCESS:
        return onSuccess(state, action)

        case POST_LOGIN_DATA_FAILURE:
            return onFailure(state, action)
    
        default:
            return { ...state } 
    }
}
import { FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

const initState = { data: [], error: false, errorData: "", isLoading: true };

export const FileUploadReducer = (state = initState, action) => {
    switch (action.type) {
        case FILE_UPLOAD_SUCCESS:
        return onSuccess(state, action)

        case FILE_UPLOAD_FAILURE:
            return onFailure(state, action)
    
        default:
            return { ...state } 
    }
}
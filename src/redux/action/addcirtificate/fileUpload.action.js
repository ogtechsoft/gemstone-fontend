import { FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAILURE } from '../../constants/index';
import { postRequest } from '../../../utilies/apiUtils';

const  FileUploadSuccess = (data) => {
    return{
        type:FILE_UPLOAD_SUCCESS,
        payload:data
    }
}

const  FileUploadFailure = (data) => {
    return{
        type:FILE_UPLOAD_FAILURE,
        payload:data
    }
}


export const FileUpload = (data) => {
    return async (dispatch, getState) => {
        const { error, result } = await postRequest(`api/attachment`, data);
        if(!error){
            return dispatch(FileUploadSuccess(result));
        }
        return dispatch(FileUploadFailure(error));
    }
    
}
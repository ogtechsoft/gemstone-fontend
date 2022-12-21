import { FIND_REPORT_SUCCESS, FIND_REPORT_FAILURE } from '../../constants/index';
import { getRequest } from '../../../utilies/apiUtils';

const  FindReportSuccess = (data) => {
    return{
        type:FIND_REPORT_SUCCESS,
        payload:data
    }
}

const  FindReportFailure = (data) => {
    return{
        type:FIND_REPORT_FAILURE,
        payload:data
    }
}


export const FindReport = (data) => {
    return async (dispatch, getState) => {
        const { error, result } = await getRequest(`api/certificates/lookup/${data}`);
        if(!error){
            return dispatch(FindReportSuccess(result));
        }
        return dispatch(FindReportFailure(error));
    }
    
}
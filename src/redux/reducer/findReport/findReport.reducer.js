import { FIND_REPORT_SUCCESS, FIND_REPORT_FAILURE } from '../../constants/index';
import { onSuccess, onFailure } from '../common';

const initState = { data: [], error: false, errorData: "", isLoading: true };

export const FindReportReducer = (state = initState, action) => {
    switch (action.type) {
        case FIND_REPORT_SUCCESS:
        return onSuccess(state, action)

        case FIND_REPORT_FAILURE:
            return onFailure(state, action)
    
        default:
            return { ...state } 
    }
}
import { combineReducers } from "redux";
import { addCertificateReducer } from "./addcirtificate/addcirtificate.reducer";
import { FindReportReducer } from "./findReport/findReport.reducer";
import { getCertificateReducer } from "./getcirtificate/getcirtificate.reducer";
import { loginReducer } from "./login/login.reducer";
import { viewCertificateReducer } from "./viewcirtificate/viewcirtificate.reducer";

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    getCertificateReducer:getCertificateReducer,
    viewCertificateReducer:viewCertificateReducer,
    addCertificateReducer:addCertificateReducer,
    FindReportReducer:FindReportReducer
})

export default rootReducer;
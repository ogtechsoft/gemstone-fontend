import React, { useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const {pathname} = useLocation()
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('uid');

    const isAuthenticated = useMemo(() => {
        return (token && uid) ? true : false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children])
    return isAuthenticated ? children : <Navigate to={`signin?redirect=${pathname}`} replace={true} />
}

export default ProtectedRoutes
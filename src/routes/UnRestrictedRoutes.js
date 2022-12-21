import React, { useMemo } from 'react'
import { Navigate } from 'react-router-dom';

const UnRestrictedRoutes = ({ children}) => {
    let token = localStorage.getItem('token');
    let uid = localStorage.getItem('uid');

    const isAuthenticated = useMemo(() => {
        return (token && uid) ? true : false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children])
    return isAuthenticated ? <Navigate to={`/`} /> : children
}

export default UnRestrictedRoutes
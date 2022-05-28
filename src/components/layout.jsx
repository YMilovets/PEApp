import React from 'react';
import { useLocation } from "react-router-dom";
import { Outlet } from 'react-router';
import Navigation from './nav';

export const Layout = ({transformItem}) => {
    const location = useLocation();
    return (
        <>
            <Navigation transition={transformItem} path={location.pathname}/>
            <Outlet />
        </>
    )
}

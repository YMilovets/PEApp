import React from 'react'
import { Outlet } from 'react-router';
import Navigation from './nav';

export const Layout = ({transformItem}) => {
    return (
        <>
            <Navigation transition={transformItem}/>
            <Outlet />
        </>
    )
}

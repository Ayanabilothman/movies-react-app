import React from 'react'
import { Navigate } from 'react-router-dom';

export function Routeguard(props) {
    const token = localStorage.getItem('token')

    return <>
        {token !== null ? props.children : <Navigate to='/login'/>}
    </>
}

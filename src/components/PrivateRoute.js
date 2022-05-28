import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function PrivateRoute(props) {
    const { currentUser } = useAuth();
    console.log(props);
    const { path, element } = props
    return currentUser ? (<>
        <Routes>
            <Route path={path}>{element}</Route></Routes></>) : (<></>);
}

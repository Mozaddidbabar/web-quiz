import { getAuth } from 'firebase/auth';
import React, { useContext } from 'react';
import '../firebase';

const AuthContext = React.createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext)
    const SignUp = () => {
        const auth = getAuth()
        console.log(auth);
    }
    const value = {}
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

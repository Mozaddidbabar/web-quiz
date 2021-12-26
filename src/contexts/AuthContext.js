import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import '../firebase';

const AuthContext = React.createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const authContext = useContext(AuthContext)

    // Sign up function
    async function SignUp(email, password, username) {
        let auth = getAuth()
        console.log(auth);
        await createUserWithEmailAndPassword(auth, email, password);
        auth = getAuth();
        let user = auth.currentUser
        await updateProfile(user, {
            displayName: username
        })
        setCurrentUser({
            ...user,
        })
    }
    // login function 
    async function Login(email, password) {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
    }

    // Logout function 
    function Logout() {
        const auth = getAuth();
        signOut(auth)
    }

    const value = {
        currentUser,
        SignUp,
        Login,
        Logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

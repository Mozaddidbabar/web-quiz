import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import '../firebase';

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false)
        })
        return unsubscribe;
    }, [setCurrentUser])

    // Sign up function
    async function Signup(email, password, username) {
        let auth = getAuth()
        // console.log(auth);
        await createUserWithEmailAndPassword(auth, email, password);
        auth = getAuth();
        let user = auth.currentUser
        await updateProfile(user, {
            displayName: username
        })
        setCurrentUser({
            ...user,
        })
        setLoading(false)
    }
    // login function 
    async function Login(email, password) {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
        setLoading(false)
    }

    // Logout function 
    function Logout() {
        const auth = getAuth();
        signOut(auth)
    }

    const value = {
        currentUser,
        Signup,
        Login,
        Logout,
        loading
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

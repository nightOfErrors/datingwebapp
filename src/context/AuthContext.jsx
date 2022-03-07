import React, { useEffect, useContext, useState } from 'react';
import app from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

    const prereqisit = {
        uid : 'VipwkVqctLPiv3h8q6k0CPucWsI3'
    }

    const [currentUser, setCurrentUser] = useState(prereqisit);

    useEffect(() => {
        const unsubscribe = app.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = { currentUser }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

import React, { createContext, useReducer } from 'react'    
import { Auth, AuthReducer } from './auth-reducer';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, Auth);

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

import React, { createContext, useState, useEffect } from 'react'
import { infoAccount } from '../Request'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState({})

    useEffect(async () => {
        const data = await infoAccount()
        setIsLogin(data)
    }, [setIsLogin])

    return (
        <AuthContext.Provider value={
            {isLogin, setIsLogin}
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
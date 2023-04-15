import React, { createContext, useState, useEffect } from "react";

type TokenProviderProps = {
    children: React.ReactNode
}

export type TokenContextType = {
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>
}

export const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({children}: TokenProviderProps) {

    const [token, setToken] = useState<string>("");
    useEffect(() => {
        const storageString = localStorage.getItem("userData")
        if(storageString) {
            const userData = JSON.parse(storageString)
            if(userData) {
                setToken(userData.token)
            }
        }
    }, [])

    return(
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    )
}
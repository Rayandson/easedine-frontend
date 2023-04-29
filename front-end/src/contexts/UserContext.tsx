import React, { createContext, useState, useEffect } from "react";
import { UserInfo } from "../types";

type UserProviderProps = {
    children: React.ReactNode
}

export type UserContextType = {
    user: UserInfo | undefined,
    setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: UserProviderProps) {

    const [user, setUser] = useState<UserInfo | undefined>(undefined);
    useEffect(() => {
        const storageString = localStorage.getItem("userData")
        if(storageString) {
            const userData = JSON.parse(storageString)
            if(userData) {
                setUser(userData.user)
            }
        }
    }, [])

    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
'use client'
import { getToken, removeToken, removeUserId, setToken, setUserId } from "@/functions/storage";
import { User } from "@/types/User";
import { ReactNode, createContext, useContext, useState } from "react";


type AuthContextType = {
    currentSlot: string,
    setCurrentSlot: (slot: string) => void,
    fetchSignUpUser: (user: User) => Promise<void>
    fetchLoginUser: (user: User) => Promise<void>
    fetchLogout: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

const baseUrl = 'https://localhost:7041/User'

export const AuthContext = createContext<AuthContextType>({
    currentSlot: '',
    setCurrentSlot: () => {},
    fetchSignUpUser: async (user: User) => { },
    fetchLoginUser: async (user: User) => { },
    fetchLogout: async () => { }
});

export const useAuth = () => {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }: AuthProviderProps) {

    let [currentSlot, setCurrentSlot] = useState<string>("login")
    const fetchSignUpUser = async (user: User) => {
        try {
            const url = `${baseUrl}/Registration`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )

            if (response.ok) {
                const responseData = await response.json()
                if (responseData) {
                    console.log(responseData);
                    let token = responseData.token
                    let userId = responseData.userId
                    console.log(token);

                    if (token)
                        await setToken(token)
                    if (userId) {
                        await setUserId(userId)
                    }
                }
            }
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const fetchLoginUser = async (user: User) => {
        try {
            const url = `${baseUrl}/Login`
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )

            if (response.ok) {
                const responseData = await response.json()
                if (responseData) {
                    console.log(responseData);
                    let token = responseData.token
                    let userId = responseData.userId
                    console.log(token);

                    if (token)
                        await setToken(token)
                    if (userId) {
                        await setUserId(userId)
                    }

                }
            }
        }
        catch (error) {
            console.log("Error occured: ", error);
            throw error;
        }
    }

    const fetchLogout = async () => {
        await removeToken()
        await removeUserId()

    }

    const contextValue: AuthContextType = { currentSlot, setCurrentSlot, fetchLoginUser, fetchSignUpUser, fetchLogout }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}


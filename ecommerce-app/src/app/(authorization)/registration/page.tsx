'use client'

import { useAuth } from "@/contexts/AuthContext"
import { getToken } from "@/functions/storage"
import { comparePasswords } from "@/functions/validation"
import { User } from "@/types/User"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Registration() {

    const [user, setUser] = useState<User>({
        email: '',
        password: '',
        repeat: ''
    })

    let authContext = useAuth()

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            let token = await getToken()
            console.log(token);

            if (token) {
                router.push('/home')
            }
        }
        fetchData()
    }, [authContext])


    const handleChangeEmail = (email: string) => {
        setUser((prev) => ({ ...prev, email: email }))
    }

    const handleChangePassword = (password: string) => {
        setUser((prev) => ({ ...prev, password: password }))
    }

    const handleChangeRepeat = (repeat: string) => {
        setUser((prev) => ({ ...prev, repeat: repeat }))
    }

    const handleRegister = async () => {
        if (comparePasswords(user) === true) {
            await authContext.fetchSignUpUser(user)
            let token = await getToken()
            if (token) {
                router.push('/home')
            }
        }
        else {
            console.log("Passwords aren't the same");
        }

    }


    return (
        <div>
            <input
                type="email"
                value={user.email}
                onChange={(e) => handleChangeEmail(e.target.value)}
                placeholder="Enter email" />
            <input
                type="password"
                value={user.password}
                onChange={(e) => handleChangePassword(e.target.value)}
                placeholder="Enter password" />
            <input
                type="password"
                value={user.repeat}
                onChange={(e) => handleChangeRepeat(e.target.value)}
                placeholder="Repeat password" />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}
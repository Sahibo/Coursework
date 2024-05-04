'use client'

import { useAuth } from "@/contexts/AuthContext"
import { getToken } from "@/functions/storage"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LogOut() {
    let authContext = useAuth()

    let router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            let token = await getToken()
            if (!token) {
                router.push('/not-found')
            }
        }
        fetchData()

    }, [])

    const handleLogOut = async () => {
        await authContext.fetchLogout()
        router.push('/auth')
    }

    return (
        <div>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}
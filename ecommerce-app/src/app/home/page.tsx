'use client'

import { useAuth } from "@/contexts/AuthContext"
import { getToken } from "@/functions/storage"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home()
{
    let authContext = useAuth()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            let token = await getToken()
            console.log(token);

            if (!token) {
                router.push('/not-found')
            }
        }
        fetchData()
    }, [authContext])

    useEffect(() => {
        const fetchData = async () => {
            let token = await getToken()
            console.log(token);

            if (!token) {
                router.push('/not-found')
            }
        }
        fetchData()
    }, [])


    return (
        <div>
            Home
        </div>
    )
}
'use client'

import { getToken } from "@/functions/storage"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Products()
{
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            let token = await getToken()
            if (!token) {
                router.push('/not-found')
            }
        }
        fetchData()

    }, [])


    return (
        <div>

        </div>
    )
}
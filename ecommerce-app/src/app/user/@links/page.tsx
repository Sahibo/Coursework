'use client'
import { useUserContext } from "@/contexts/UserContext";
import Link from "next/link";


export default function Links() {
    const userContext = useUserContext()

    const handleChangeCurrentSlot = (slot: string) => {
        userContext.setCurrentSlot(slot)
    }
    return (
        <div>
            <Link
                href={"/user"}
                onClick={() => handleChangeCurrentSlot("address")}
                className={userContext.currentSlot === "address" ? "activeLink" : ""}
            >
                Address
            </Link>
            <Link
                href={"/user"}
                onClick={() => handleChangeCurrentSlot("cart")}
                className={userContext.currentSlot === "cart" ? "activeLink" : ""}
            >
                Cart
            </Link>
            <Link
                href={"/user"}
                onClick={() => handleChangeCurrentSlot("order")}
                className={userContext.currentSlot === "order" ? "activeLink" : ""}
            >
                Order
            </Link>
            <Link
                href={"/user"}
                onClick={() => handleChangeCurrentSlot("logout")}
                className={userContext.currentSlot === "logout" ? "activeLink" : ""}
            >
                Logout
            </Link>
        </div>
    )
}
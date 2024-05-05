"use client";
import { ReactNode } from "react";
import styles from "./layout.module.css";
import { useUserContext } from "@/contexts/UserContext";
interface Props {
    children: ReactNode
    links: ReactNode
    cart: ReactNode
    order: ReactNode
    logout: ReactNode
    address: ReactNode
}

export default function Layout({ children, links, cart, order, logout, address }: Props) {
    const userContext = useUserContext()

    return (
        <div className={styles.mainContainer}>
            <div className={styles.authContainer}>
                <div>
                    {links}
                </div>
                <div>
                    {userContext.currentSlot === "address" ? (
                        <div>
                            {address}
                        </div>
                    ) : (
                        <></>
                    )}
                      {userContext.currentSlot === "cart" ? (
                        <div>
                            {cart}
                        </div>
                    ) : (
                        <></>
                    )}
                      {userContext.currentSlot === "order" ? (
                        <div>
                            {order}
                        </div>
                    ) : (
                        <></>
                    )}
                      {userContext.currentSlot === "logout" ? (
                        <div>
                            {logout}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

"use client";
import { H2 } from "@/components/unknown/CustomTexts";
import styles from "./header.module.css";
import { useAuth } from "@/contexts/AuthContext";


export default function Header() {

    const authContext = useAuth()
    const handleChangeSlot = (slot: string) => {
        authContext.setCurrentSlot(slot)
    }


    return (
        <div className={styles.mainContainer}>
            <div onClick={() => handleChangeSlot('register')} className={`${styles.tabContainer} ${styles.leftTabContainer}`}>
                <H2>Register</H2>
            </div>
            <div onClick={() => handleChangeSlot('login')} className={`${styles.tabContainer} ${styles.rightTabContainer}`}>
                <H2>Login</H2>
            </div>
        </div>
    );
}
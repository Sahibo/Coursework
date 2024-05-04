"use client";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import Header from "./header";
import styles from "./layout.module.css";
interface Props {
  children: ReactNode;
  login: ReactNode;
  registration: ReactNode;
}

export default function Layout({ children, login, registration }: Props) {
  const authContext = useAuth();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.authContainer}>
        <Header />
        {authContext.currentSlot === "login" ? (
          <div>{login}</div>
        ) : (
          <div>{registration}</div>
        )}
      </div>
      {children}
    </div>
  );
}

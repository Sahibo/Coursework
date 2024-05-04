"use client";
// import "../app/globals.css";
import styles from "./authForm.module.css";

import { H2, TextMedium, TextSmall } from "../unknown/CustomTexts";
import Header from "./header";
import Form from "./form";
import { ChildrenProps } from "@/types/ComponentsTypes";

export default function AuthForm({ children }: ChildrenProps) {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <Form />
    </div>
  );
}

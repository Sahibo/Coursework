"use client";
// import "../app/globals.css";
import styles from "./header.module.css";

import { H2, TextMedium, TextSmall } from "../../unknown/CustomTexts";

export default function Header() {
  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.tabContainer} ${styles.leftTabContainer}`}>
        <H2>Register</H2>
      </div>
      <div className={`${styles.tabContainer} ${styles.rightTabContainer}`}>
        <H2>Login</H2>
      </div>
    </div>
  );
}

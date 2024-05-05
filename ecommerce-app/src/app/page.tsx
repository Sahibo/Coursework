"use client";
import styles from "./tmp.module.css"
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/unknown/CustomButton";

export default function Home() {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  return (
    <main className={styles.tmpMain}>
      <span className={styles.tmpSpan}>Ecommerce</span>
    </main>
  );
}

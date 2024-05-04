"use client";

import styles from "./form.module.css";

import { TextSmall } from "../../unknown/CustomTexts";
import { PrimaryButton } from "@/components/unknown/CustomButton";
import { BaseInput } from "@/components/unknown/CustomForms";

export default function Form() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <TextSmall>Email address</TextSmall>
        <BaseInput />
      </div>
      <div className={styles.inputContainer}>
        <TextSmall>Password</TextSmall>
        <BaseInput />
      </div>
      <div className={styles.buttonContainer}>
        <PrimaryButton>Register</PrimaryButton>
      </div>
    </div>
  );
}

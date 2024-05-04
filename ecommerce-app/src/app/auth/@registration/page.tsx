"use client";

import { PrimaryButton } from "@/components/unknown/CustomButton";
import { BaseInput } from "@/components/unknown/CustomForms";
import { TextSmall } from "@/components/unknown/CustomTexts";
import { useAuth } from "@/contexts/AuthContext";
import { getToken } from "@/functions/storage";
import { comparePasswords } from "@/functions/validation";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../auth.module.css";
export default function Registration() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    confirm: "",
  });

  let authContext = useAuth();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let token = await getToken();
      console.log(token);

      if (token) {
        router.push("/home");
      }
    };
    fetchData();
  }, [authContext]);

  const handleChangeEmail = (email: string) => {
    setUser((prev) => ({ ...prev, email: email }));
  };

  const handleChangePassword = (password: string) => {
    setUser((prev) => ({ ...prev, password: password }));
  };

  const handleChangeConfirm = (confirm: string) => {
    setUser((prev) => ({ ...prev, confirm: confirm }));
  };

  const handleRegister = async () => {
    if (comparePasswords(user) === true) {
      await authContext.fetchSignUpUser(user);
      let token = await getToken();
      if (token) {
        router.push("/home");
      }
    } else {
      console.log("Passwords aren't the same");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        <TextSmall>Email address</TextSmall>
        <BaseInput
          type="email"
          value={user.email}
          onChange={(e) => handleChangeEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>
      <div className={styles.inputContainer}>
        <TextSmall>Password</TextSmall>
        <BaseInput
          type="password"
          value={user.password}
          onChange={(e) => handleChangePassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <div className={styles.inputContainer}>
        <TextSmall>Confirm password</TextSmall>
        <BaseInput
          type="password"
          value={user.confirm}
          onChange={(e) => handleChangeConfirm(e.target.value)}
          placeholder="Confirm password"
        />
      </div>
      <div className={styles.buttonContainer}>
        <PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
      </div>
    </div>
  );
}

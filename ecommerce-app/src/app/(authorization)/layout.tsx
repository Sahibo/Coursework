import AuthForm from "@/components/authForm";
import { ChildrenProps } from "@/types/ComponentsTypes";
import styles from "./auth.module.css";

export default function Layout({ children }: ChildrenProps) {
  return (
    <div className={styles.mainContainer}>
      <AuthForm>{children}</AuthForm>
    </div>
  );
}

"use client";
import styles from "./grid.module.css";
import { ChildrenProps } from "@/types/ComponentsTypes";

export default function Grid({ children }: ChildrenProps) {
  return <div className={styles.mainContainer}>{children}</div>;
}

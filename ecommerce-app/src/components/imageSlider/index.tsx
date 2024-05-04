import styles from "./imageSlider.module.css";
import { ChildrenProps } from "@/types/ComponentsTypes";

export default function ImageSlider({ children }: ChildrenProps) {
  return <div className={styles.mainContainer}>{children}</div>;
}

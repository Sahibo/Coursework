"use client";

import styles from "./header.module.css";
import { TextMedium } from "../unknown/CustomTexts";
import { Color } from "@/types/Color";
import { Colors } from "../unknown/Colors";
import LikeIcon from "@/icons/LikeIcon";

export default function Header() {
  return (
    <nav className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <TextMedium color={Colors.primaryDark}>Man</TextMedium>
        <TextMedium color={Colors.primaryDark}>Woman</TextMedium>
      </div>
      <div className={styles.rightContainer}>
        <LikeIcon></LikeIcon>
        <LikeIcon></LikeIcon>
        <LikeIcon></LikeIcon>
      </div>
    </nav>
  );
}

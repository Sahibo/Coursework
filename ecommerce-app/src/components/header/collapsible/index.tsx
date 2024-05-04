"use client";

import styles from "./collapsible.module.css";
import { TextMedium, TextLarge } from "../../unknown/CustomTexts";
import { Color } from "@/types/Color";
import { Colors } from "../../unknown/Colors";
import LikeIcon from "@/icons/LikeIcon";

export default function Collapsible() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.pCategoriesContainer}>
        <ul className={styles.pCategoriesList}>
          <li className={styles.pCategoriesItem}>
            <TextLarge>Test name</TextLarge>
          </li>
          <li className={styles.pCategoriesItem}>
            <TextLarge>Test name</TextLarge>
          </li>
          <li className={styles.pCategoriesItem}>
            <TextLarge>Test name</TextLarge>
          </li>
          <li className={styles.pCategoriesItem}>
            <TextLarge>Test name</TextLarge>
          </li>
          <li className={styles.pCategoriesItem}>
            <TextLarge>Test name</TextLarge>
          </li>
          <li className={styles.pCategoriesItem}>
            <TextLarge>Test name</TextLarge>
          </li>
        </ul>
      </div>
      <div className={styles.categoriesContainer}>
        <ul className={styles.categoriesList}>
          <li className={styles.categoriesItem}>
            <TextMedium>Test name</TextMedium>
          </li>
          <li className={styles.categoriesItem}>
            <TextMedium>Test name</TextMedium>
          </li>
          <li className={styles.categoriesItem}>
            <TextMedium>Test name</TextMedium>
          </li>
        </ul>
      </div>
    </div>
  );
}

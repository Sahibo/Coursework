"use client";
import React, { useState } from "react";

import styles from "./header.module.css";
import { TextMedium } from "../unknown/CustomTexts";
import { Colors } from "../unknown/Colors";
import Collapsible from "./collapsible";
import LikeIcon from "@/icons/LikeIcon";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onMouseLeave={() => setIsHovered(false)}>
      <nav className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <TextMedium
            color={Colors.primaryDark}
            onMouseEnter={() => setIsHovered(true)}
          >
            Man
          </TextMedium>
          <TextMedium
            color={Colors.primaryDark}
            onMouseEnter={() => setIsHovered(true)}
          >
            Woman
          </TextMedium>
        </div>
        <div className={styles.rightContainer}>
          <LikeIcon></LikeIcon>
          <LikeIcon></LikeIcon>
          <LikeIcon></LikeIcon>
        </div>
      </nav>
      {/* <Collapsible /> */}
      {isHovered && <Collapsible />}
    </div>
  );
}

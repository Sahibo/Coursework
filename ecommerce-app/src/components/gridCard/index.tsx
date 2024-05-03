"use client";
// import "../app/globals.css";
import styles from "./gridCard.module.css";
import Image from "next/image";
import image from "../../images/image.png";
import { H2, TextMedium, TextSmall } from "../unknown/CustomTexts";
import { GridCardProps } from "@/types/ComponentsTypes";
import LikeIcon from "@/icons/LikeIcon";

export default function GridCard({}: GridCardProps) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <Image src={image} alt={`gridCardImg`} width={480} height={240} />
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.infoContainer}>
          <H2>Name of product</H2>
          <TextMedium>100$</TextMedium>
        </div>

        <div className={styles.iconContainer}>
          <LikeIcon />
        </div>
      </div>
    </div>
  );
}

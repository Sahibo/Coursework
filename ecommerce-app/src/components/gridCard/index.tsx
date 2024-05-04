"use client";
// import "../app/globals.css";
import styles from "./gridCard.module.css";
import Image from "next/image";
import image from "../../images/image.png";
import { H2, TextMedium, TextSmall } from "../unknown/CustomTexts";

import LikeIcon from "@/icons/LikeIcon";
import { GridItem } from "@/types/GridItem";
import Link from "next/link";

interface Props {
  //children: ReactNode
  gridItem: GridItem;
}

export default function GridCard({ gridItem }: Props) {
  return (
    <div className={styles.mainContainer}>
      <Link href={`/products/${gridItem.id}`}>
        <div className={styles.imageContainer}>
          <Image
            src={`data:image/jpeg;base64,${gridItem.imageData}`}
            alt={`gridCardImg`}
            width={480}
            height={240}
          />
        </div>
      </Link>

      <div className={styles.bottomContainer}>
        <div className={styles.infoContainer}>
          <H2>{gridItem.name}</H2>
          <TextMedium>{gridItem.price}</TextMedium>
        </div>

        <div className={styles.iconContainer}>
          <LikeIcon />
        </div>
      </div>
    </div>
  );
}

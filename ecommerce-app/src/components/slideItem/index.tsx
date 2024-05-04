"use client";
import styles from "./slideItem.module.css";
import { ChildrenProps } from "@/types/ComponentsTypes";
import Image from "next/image";
import Link from "next/link";
import { SlideItem } from "@/types/SlideItem";
interface Props {
  slideItem: SlideItem;
}
export default function SlideCard({ slideItem }: Props) {
  return (
    <div className={styles.mainContainer}>
      <Link href={`/products/${slideItem.id}`}>
        <Image
          src={`data:image/jpeg;base64,${slideItem.imageData}`}
          alt={`gridCardImg`}
          width={480}
          height={240}
        />
      </Link>
    </div>
  );
}

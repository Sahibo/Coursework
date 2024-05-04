"use client";
import { ProductImage } from "@/types/Product";
import styles from "./images.module.css";
import { ChildrenProps } from "@/types/ComponentsTypes";
import Image from "next/image";
import { useState } from "react";

interface Props {
  alt: string;
  productImages: ProductImage[];
}
export default function Images({ productImages }: Props) {
  const [index, setIndex] = useState<number>(0);

  const handleSetIndex = (index: number) => {
    setIndex(index);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainImageContainer}>
        <Image
          src={`data:image/jpeg;base64,${productImages[index].imageData}`}
          alt={`gridCardImg`}
          width={480}
          height={240}
        />
      </div>
      <div className={styles.imagesContainer}>
        {productImages.map((productImage, index) => (
          <Image
            onClick={() => handleSetIndex(index)}
            key={productImage.id}
            src={`data:image/jpeg;base64,${productImage.imageData}`}
            alt={`gridCardImg`}
            width={480}
            height={240}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import ImageSlider from "@/components/imageSlider";
import Images from "@/components/images";
import Image from "@/components/images";
import SlideItem from "@/components/slideItem";
import { useCart } from "@/contexts/CartContext";
import { useProductContext } from "@/contexts/ProductContext";
import { Color } from "@/types/Color";
import { ProductVariation, SubProductVariation } from "@/types/Product";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./productDetails.module.css";
import SizeSelector from "@/components/sizeSelector";
import {
  H1,
  H2,
  TextSmall,
  TextMedium,
} from "@/components/unknown/CustomTexts";
import { PrimaryButton } from "@/components/unknown/CustomButton";

interface Props {
  params: {
    id: string;
  };
}
export default function ProductDetails({ params }: Props) {
  let { id } = params;
  let [subProductVariations, setSubProductVariations] = useState<
    SubProductVariation[]
  >([]);

  let [productVariations, setProductVariations] = useState<ProductVariation[]>(
    []
  );

  let [subProductVariation, setSubProductVariation] =
    useState<SubProductVariation | null>(null);

  const productContext = useProductContext();
  const cartContext = useCart();

  useEffect(() => {
    const fetchData = async () => {
      let subProductVariations =
        await productContext.fetchSubProductVarsByProductVarId(Number(id));
      console.log(subProductVariations);
      setSubProductVariations(subProductVariations);
      setSubProductVariation(subProductVariations[0]);
    };
    fetchData();
  }, [productContext, id]);

  useEffect(() => {
    const fetchData = async () => {
      if (subProductVariation) {
        let productVariations =
          await productContext.fetchProductVariationsByProductId(
            subProductVariation.productVariation.product.id
          );
        console.log(productVariations);

        if (productVariations) {
          setProductVariations(productVariations);
        }
      }
    };
    fetchData();
  }, [productContext, subProductVariation]);

  const handleChangeSubProductVar = async (id: number) => {
    let subProductVariation = await productContext.fetchSubProductVarById(id);
    if (subProductVariation) {
      setSubProductVariation(subProductVariation);
    }
  };

  const handleAddItem = async () => {
    if (subProductVariation) {
      await cartContext.fetchAddItem(subProductVariation.id);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {subProductVariations && subProductVariation ? (
        <div className={styles.mainProductContainer}>
          <div className={styles.leftContainer}>
            <Images
              alt={subProductVariation.productVariation.product.name}
              productImages={subProductVariation.productVariation.productImages}
            />
          </div>
          <div className={styles.rightContainer}>
            <H1>{subProductVariation.productVariation.product.name}</H1>
            <TextMedium>$ {subProductVariation.price}</TextMedium>
            <TextSmall>
              {subProductVariation.productVariation.product.description}
            </TextSmall>
            <ImageSlider>
              {productVariations && productVariations.length > 0 ? (
                <div>
                  {productVariations.map((productVariation) => (
                    <div key={productVariation.id}>
                      <SlideItem
                        slideItem={{
                          id: productVariation.id,
                          imageData:
                            productVariation.productImages[0].imageData,
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </ImageSlider>

            <SizeSelector
              handleChangeSubProductVar={handleChangeSubProductVar}
              subProductVariation={subProductVariation}
              subProductVariations={subProductVariations}
            />
            <PrimaryButton onClick={() => handleAddItem()}>
              Add to cart
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

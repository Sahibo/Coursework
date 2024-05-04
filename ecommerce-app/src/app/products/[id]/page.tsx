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
    <div>
      {subProductVariations && subProductVariation ? (
        <div>
          <h1>{subProductVariation.productVariation.product.name}</h1>
          <h1>{subProductVariation.price}</h1>
          <h1>{subProductVariation.productVariation.product.description}</h1>

          <Images
            alt={subProductVariation.productVariation.product.name}
            productImages={subProductVariation.productVariation.productImages}
          />

          <ImageSlider>
            {productVariations && productVariations.length > 0 ? (
              <div>
                {productVariations.map((productVariation) => (
                  <div key={productVariation.id}>
                    <SlideItem
                      slideItem={{
                        id: productVariation.id,
                        imageData: productVariation.productImages[0].imageData,
                      }}
                    />
                    {/* <Link href={`/products/${productVariation.id}`}>
                      <h1>{Color[productVariation.color]}</h1>
                    </Link> */}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </ImageSlider>

          <div>
            {subProductVariations.map((subProductVariation) => (
              <div key={subProductVariation.id}>
                <button
                  onClick={() =>
                    handleChangeSubProductVar(subProductVariation.id)
                  }
                >
                  <h1>{subProductVariation.size}</h1>
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => handleAddItem()}>Add to cart</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

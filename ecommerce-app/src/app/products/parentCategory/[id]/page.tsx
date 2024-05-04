"use client";

import Grid from "@/components/grid";
import GridCard from "@/components/gridCard";
import { useProductContext } from "@/contexts/ProductContext";
import { Product } from "@/types/Product";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}
export default function Products({ params }: Props) {
  const { id } = params;
  let [products, setProducts] = useState<Product[]>([]);
  const productContext = useProductContext();

  useEffect(() => {
    const fetchData = async () => {
      let products = await productContext.fetchProductsByParentCategoryId(
        Number(id)
      );
      setProducts(products);
    };
    fetchData();
  }, [productContext, id]);

  return (
    <Grid>
      {products.map((product) =>
        product.productVariations.map((productVariation) => (
          <div key={productVariation.id}>
            <GridCard
              gridItem={{
                id: productVariation.id,
                name: product.name,
                price: productVariation.subProductVariations[0].price,
                imageData: productVariation.productImages[0].imageData,
              }}
            />
          </div>
        ))
      )}
    </Grid>
  );
}

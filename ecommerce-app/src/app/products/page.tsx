"use client";

import Grid from "@/components/grid";
import GridCard from "@/components/gridCard";
import { useProductContext } from "@/contexts/ProductContext";
import { getToken } from "@/functions/storage";
import { ProductVariation } from "@/types/Product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Products() {
  let productContext = useProductContext();
  const [productVariations, setProductVariations] = useState<
    ProductVariation[]
  >([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      let token = await getToken();
      if (!token) {
        router.push("/not-found");
      }
    };
    fetchData();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      let productVariations = await productContext.fetchProductVariations();
      console.log(productVariations);
      setProductVariations(productVariations);
    };
    fetchData();
  }, [productContext]);

  return (
    <Grid>
      {productVariations.length > 0 ? (
        productVariations.map((productVariation) => (
          <div key={productVariation.id}>
            <GridCard
              gridItem={{
                id: productVariation.id,
                name: productVariation.product.name,
                price: productVariation.subProductVariations[0].price,
                imageData: productVariation.productImages[0].imageData,
              }}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </Grid>
  );
}

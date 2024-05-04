import React, { ReactNode } from "react";
import { Product, ProductVariation, SubProductVariation } from "./Product";

export interface ChildrenProps {
  children: ReactNode;
}

export interface WidthProps {
  width?: number;
}

export interface ColorProps {
  color?: string;
}

export interface GridProps {
  products: Product[] | [],
  productVariations: ProductVariation[] | [],
  subProductVariations: SubProductVariation[] | [],
}

export interface GridCardProps {
  // children: ReactNode
  // title: string
}
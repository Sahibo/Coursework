"use client";

import styles from "./header.module.css";
import { TextMedium } from "../unknown/CustomTexts";
// import { Color } from "@/types/Color";
import { Colors } from "../unknown/Colors";
import LikeIcon from "@/icons/LikeIcon";
import { Gender } from "@/types/Gender";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ParentCategory } from "@/types/ParentCategory";
import { useCategoryContext } from "@/contexts/CategoryContext";
import Collapsible from "./collapsible";
import UserIcon from "@/icons/UserIcon";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const categoryContext = useCategoryContext();
  const authContext = useAuth();
  const [categories, setCategories] = useState<ParentCategory[]>([]);
  const handleGetProducts = (gender: Gender) => {
    router.push(`/products/gender/${gender}`);
  };

  const handleNavToUser = (slot: string) => {
    router.push("/auth");
    authContext.setCurrentSlot(slot);
  };

  const handleGetCategoriesByGender = async (gender: Gender) => {
    let categories = await categoryContext.fetchParentCategoriesByGender(
      gender
    );
    setCategories(categories);
    console.log(categories);
    setIsHovered(true);
  };

  const handleIsHoveredChange = () => {
    setIsHovered(false);
  };
  return (
    <div onMouseLeave={handleIsHoveredChange}>
      <nav className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <button
            onClick={() => handleGetProducts(Gender.Man)}
            onMouseEnter={() => handleGetCategoriesByGender(Gender.Man)}
          >
            <TextMedium color={Colors.primaryDark}>Man</TextMedium>
          </button>
          <button
            onClick={() => handleGetProducts(Gender.Woman)}
            onMouseEnter={() => handleGetCategoriesByGender(Gender.Woman)}
          >
            <TextMedium color={Colors.primaryDark}>Woman</TextMedium>
          </button>
        </div>
        <div className={styles.rightContainer}>
          <div onClick={() => handleNavToUser("login")}>
            <LikeIcon></LikeIcon>
          </div>
          <LikeIcon></LikeIcon>
        </div>
      </nav>
      {isHovered && <Collapsible categoriesData={categories} />}
    </div>
  );
}

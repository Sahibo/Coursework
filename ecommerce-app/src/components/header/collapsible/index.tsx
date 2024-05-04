"use client";

import styles from "./collapsible.module.css";
import { TextMedium, TextLarge } from "../../unknown/CustomTexts";
import { Color } from "@/types/Color";
import { Colors } from "../../unknown/Colors";
import LikeIcon from "@/icons/LikeIcon";
import { useEffect, useState } from "react";
import { ParentCategory } from "@/types/ParentCategory";
import { useRouter } from "next/navigation";

interface Props {
    categoriesData: ParentCategory[]
}

export default function Collapsible({ categoriesData }: Props) {
    let [categories, setCategories] = useState<ParentCategory[]>(categoriesData)
    let [isHovered, setIsHovered] = useState(false)
    let [id, setId] = useState<number>(0)
    const router = useRouter()

    useEffect(() => {
        setCategories(categoriesData)
    }, [categoriesData])


    const handleNavigateByParentCategoryId = (id: number) => {
        router.push(`/products/parentCategory/${id}`)
    }

    const handleNavigateByCategoryId = (id: number) => {
        router.push(`/products/category/${id}`)
    }

    const handleIsHoveredChange = (parentCategoryId: number, value: boolean) => {
        setId(parentCategoryId)
        setIsHovered(value)
    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.pCategoriesContainer}>
                <ul className={styles.pCategoriesList}>
                    {categories.map((parentCategory) =>
                    (
                        <li
                            key={parentCategory.id}
                            className={styles.pCategoriesItem}
                            onMouseEnter={() => handleIsHoveredChange(parentCategory.id, true)}
                            onClick={() => handleNavigateByParentCategoryId(parentCategory.id)}>
                            <TextLarge>{parentCategory.name}</TextLarge>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.categoriesContainer}>
                {isHovered && id !== 0 && ( 
                    <ul className={styles.categoriesList}>
                        {categories
                            .filter((parentCategory) => parentCategory.id === id) 
                            .map((parentCategory) =>
                                parentCategory.categories.map((category) => (
                                    <li onClick={() => handleNavigateByCategoryId(category.id)} key={category.id} className={styles.categoriesItem}>
                                        <TextMedium>{category.name}</TextMedium>
                                    </li>
                                ))
                            )}
                    </ul>
                )}
            </div>
        </div>
    );
}
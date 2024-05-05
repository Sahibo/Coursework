"use client";
import { SubProductVariation } from "@/types/Product";
import { TextMedium } from "../unknown/CustomTexts";
import styles from "./sizeSelector.module.css";
import { useState } from "react";
interface Props {
  subProductVariation: SubProductVariation;
  subProductVariations: SubProductVariation[];
  handleChangeSubProductVar: (id: number) => void;
}
export default function SizeSelector({
  handleChangeSubProductVar,
  subProductVariations,
  subProductVariation,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.selectedContainer} onClick={toggleDropdown}>
        <TextMedium>{subProductVariation.size}</TextMedium>
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdownContent}>
          {subProductVariations.map((subProductVariation) => (
            <div
              key={subProductVariation.id}
              className={styles.dropDownItem}
              onClick={() => handleChangeSubProductVar(subProductVariation.id)}
              
            >
              <TextMedium>{subProductVariation.size}</TextMedium>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

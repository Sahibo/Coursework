import React from "react";
import { ColorProps } from "../types/ComponentsTypes";

function LikeIcon({ color = "#272525" }: ColorProps) {
  return (
    <svg
      height="35"
      width="35"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h50v50H0z" fill="none" />
      <path
        d="M35 8c-4.176 0-7.851 2.136-10 5.373C22.851 10.136 19.176 8 15 8 8.373 8 3 13.373 3 20c0 14 16 21 22 26 6-5 22-12 22-26 0-6.627-5.373-12-12-12z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  );
}

export default LikeIcon;
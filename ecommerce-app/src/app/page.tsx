"use client";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/unknown/CustomButton";

export default function Home() {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  return (
    <main>
      <h1>Welcome to Next.js</h1>
      <PrimaryButton onClick={handleClick}>Primary Button</PrimaryButton>
      <SecondaryButton onClick={handleClick}>Outlined Button</SecondaryButton>
    </main>
  );
}

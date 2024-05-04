"use client";
import Grid from "@/components/grid";
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
      <PrimaryButton onClick={handleClick}>Primary Button</PrimaryButton>
      <SecondaryButton onClick={handleClick}>Outlined Button</SecondaryButton>
      <Grid></Grid>
    </main>
  );
}
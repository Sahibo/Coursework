"use client";
// import "../app/globals.css";
import styles from "./grid.module.css";
import GridCard from "../gridCard";
export default function Grid() {
  return (
    <div className={styles.mainContainer}>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
      <GridCard></GridCard>
    </div>
  );
}

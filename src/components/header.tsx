import React from 'react'
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();
  return (
    <div className={styles.description}>
          <h2 style={{cursor:"pointer",textDecoration: "underline"}} onClick={()=>router.push("/")}>Home</h2>
          <h2 style={{cursor:"pointer",textDecoration: "underline"}} onClick={()=>router.push("/quotes")}>Quotes</h2>
          <h2 style={{cursor:"pointer",textDecoration: "underline"}} onClick={()=>router.push("/dialogues")}>Dialogues</h2>
          <h2 style={{cursor:"pointer",textDecoration: "underline"}} onClick={()=>router.push("/proverbs")}>Proverbs</h2>
        </div>
  )
}

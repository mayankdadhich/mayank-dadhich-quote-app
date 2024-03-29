import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

interface Proverb {
  id: number;
  text: string;
  origin: string;
}

interface HomeProps {
  proverbs: Proverb[];
}

export default function Home(props: HomeProps): JSX.Element {
  const [proverbId, setProverbId] = useState<number | undefined>();

  return (
    <>
      <Head>
        <title>Proverbs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Header />
        <div className={styles.center}>
          <h1>Proverbs</h1>
        </div>
        <div className={styles.grid}>
          {props.proverbs.map((item: Proverb, index: number) => {
            return (
              <div className={styles.card} key={index}>
                {item.text.length <= 45 ? (
                  <h2>{item.text}</h2>
                ) : proverbId !== item.id ? (
                  <h2>
                    {`${item.text.slice(0, 45)}...`}
                    <p
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => setProverbId(item.id)}
                    >
                      show more
                    </p>
                  </h2>
                ) : (
                  <h2>
                    {item.text}
                    <p
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => setProverbId(undefined)}
                    >
                      show less
                    </p>
                  </h2>
                )}
                <p>Origin : {item.origin}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const getProverbs = async (): Promise<Proverb[]> => {
    try {
      const response = await axios.get("https://wordsapi-nkj3.onrender.com/proverbs");
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const proverbs: Proverb[] = (await getProverbs()) ?? [];

  return { props: { proverbs } };
}


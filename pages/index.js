import Head from "next/head";
import styles from "../styles/Home.module.css";
import { MeiliSearch } from "meilisearch";
import { useState } from "react";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const client = new MeiliSearch({
    host: "http://localhost:7700",
  });

  const searchMovies = async (e) => {
    client
      .index("movies")
      .search(e.target.value)
      .then((results) => {
        setSearchResults(results.hits);
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Meiliesearch Demo</title>
        <meta name="description" content="Meilisearch pagination demo" />
        <link rel="icon" href="/mili.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Search your favorite movies</h1>
        <input
          className={styles.search}
          type="text"
          placeholder="Search for a movie..."
          onChange={(e) => searchMovies(e)}
        />
        <div className={styles.grid}>
          {searchResults.map((resource) => (
            <div key={resource.id} className={styles.card}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resource.poster}
                alt={resource.name}
                width={200}
                height={300}
              />
              <h3>{resource.title}</h3>
              <p>{resource.overview.substring(0, 50)}...</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          With love by Kenny
        </a>
      </footer>
    </div>
  );
}

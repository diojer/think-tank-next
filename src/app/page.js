import React from "react";
import Head from "next/head";

const articles_path = `${process.env.APP_URL}/api/articles/`;

async function getArticles() {
  const response = await fetch(articles_path);
  const data = await response.json();
  return data;
}

export default async function Home() {
  const articles = await getArticles();
  console.log(articles.data[0]);
  return (
    <>
      <Head>
        <title>Leeds Think Tank - Home</title>
      </Head>
      <p>Home Page</p>
    </>
  );
}

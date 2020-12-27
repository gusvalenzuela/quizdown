import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import "./_app.css";
import "semantic-ui-css/semantic.min.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>QuizDown⁉</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

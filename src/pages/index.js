import Head from "next/head";
import Foot from "../components/Foot";
import SelectionScreen from "../components/SelectionScreen";
import PlayScreen from "../components/PlayScreen";
import { useState } from "react";

function Home({ categories }) {
  const [questions, setQuestions] = useState(null); // null to prevent the render down below

  return (
    <div className="container">
      <Head>
        <title>QuizDown⁉</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>

      <main>
        {!questions ? (
          <>
            <h1 className="title">
              Welcome to <span style={{ color: "#06ddfd" }}>QuizDown⁉</span>
            </h1>
            <SelectionScreen
              categories={categories}
              setQuestions={setQuestions}
            />
          </>
        ) : (
          <PlayScreen
            category={questions.category}
            questions={questions.questions}
          />
        )}
      </main>

      <Foot />
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://opentdb.com/api_category.php");
  const data = await res.json();
  const categories = data.trivia_categories;

  // By returning { props: categories }, the component
  // will receive `categories` as a prop at build time
  return {
    props: {
      categories,
    },
  };
}

export default Home;

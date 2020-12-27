import React, { useState } from 'react'
import Head from 'next/head'
// import { useCurrentUser } from '../lib/hooks';
// import PostEditor from '../components/post/editor'
// import Posts from '../components/post/posts'
import SelectionScreen from '../components/SelectionScreen'
import PlayScreen from '../components/PlayScreen'
import FinalScoreScreen from '../components/FinalScoreScreen'

const IndexPage = ({ categories }) => {
  // const [user] = useCurrentUser();
  const [quiz, setQuiz] = useState(null) // null to prevent the render down below
  const [allAnswered, setAllAnswered] = useState(false)

  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
          h3 {
            color: #555;
          }
          h1.title {
            color: #fff;
          }
        `}
      </style>
      <Head>
        <title>
          {quiz
            ? `${quiz.category || 'Unknown'} | ${
                quiz?.difficulty || 'No difficulty found'
              }`
            : 'Select your quiz!'}
        </title>
      </Head>
      <div>
        {!quiz ? (
          <>
            <h1 className="title">
              Welcome to <span style={{ color: '#06ddfd' }}>QuizDown⁉</span>
            </h1>
            <SelectionScreen categories={categories} setQuiz={setQuiz} />
          </>
        ) : !allAnswered ? (
          <PlayScreen
            quiz={quiz}
            allAnswered={allAnswered}
            setAllAnswered={setAllAnswered}
          />
        ) : (
          <FinalScoreScreen
            category={quiz.category}
            difficulty={quiz.difficulty}
            score={7}
          />
        )}
      </div>
    </>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const data = await fetch('https://opentdb.com/api_category.php').then((r) =>
    r.json()
  )
  const categories = data.trivia_categories

  // By returning { props: categories }, the component
  // will receive `categories` as a prop at build time
  return {
    props: {
      categories,
    },
  }
}

export default IndexPage

import React, { useState } from 'react'
import Head from 'next/head'
// import { useCurrentUser } from '../lib/hooks';
import SelectionScreen from '../components/SelectionScreen'
import PlayScreen from '../components/PlayScreen'
import FinalScoreScreen from '../components/FinalScoreScreen'

const IndexPage = ({ categories }) => {
  // const [user] = useCurrentUser();
  const [quiz, setQuiz] = useState(null) // null to prevent the render down below
  const [allAnswered, setAllAnswered] = useState(false)
  const [finalScore, setFinalScore] = useState(null)

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
            text-align: center;
          }
        `}
      </style>
      <Head>
        <title>
          {quiz
            ? `${quiz.category || 'Unknown'} | ${
                quiz.difficulty || 'No difficulty found'
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
            setFinalScore={setFinalScore}
          />
        ) : (
          <FinalScoreScreen
            categoryDetails={{
              name: quiz.category,
              id: quiz.categoryId,
              difficulty: quiz.difficulty,
            }}
            score={finalScore}
          />
        )}
      </div>
    </>
  )
}

export async function getServerSideProps() {
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

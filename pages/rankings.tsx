import React, { useRef } from 'react'
import Head from 'next/head'
// import { useCurrentUser } from '../lib/hooks';
import Leaderboard from '../components/Leaderboard'

const RankingsPage = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(
    categories[0].id
  )
  const categorySelectionRef = useRef(null)
  // const [user] = useCurrentUser();
  //   const [quiz, setQuiz] = useState(null) // null to prevent the render down below
  //   const [allAnswered, setAllAnswered] = useState(false)
  //   const [finalScore, setFinalScore] = useState(null)

  return (
    <>
      <style jsx>
        {`
          select,
          div {
            text-align: center;
          }
        `}
      </style>
      <Head>
        <title>QuizDown?! Score Rankings</title>
      </Head>
      <div>
        <select
          ref={categorySelectionRef}
          onChange={() =>
            setSelectedCategory(categorySelectionRef.current.value)
          }
        >
          {categories &&
            categories.map((cat) => (
              <option title={cat.name} key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
        <Leaderboard category={selectedCategory || 9} />
      </div>
    </>
  )
}

export default RankingsPage

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

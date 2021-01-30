import React from 'react'
import { useRouter } from 'next/router'

function FinalScore({ category, difficulty, score }) {
  const router = useRouter()
  // function saveToDatabase() {
  //   // console.log()
  // }
  return (
    <>
      <div className="finalScreen container">
        <h1 className="title">{category || 'Category Name'}</h1>

        <p className={difficulty}>{difficulty}</p>
        <p>Score: {score}</p>

        <button type="button" onClick={() => router.reload()}>
          Try again!
        </button>
      </div>
    </>
  )
}

export default FinalScore

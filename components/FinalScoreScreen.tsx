import React from 'react'
import { useRouter } from 'next/router'
import Leaderboard from './Leaderboard'
import InitialsForm from './InitialsForm'

function FinalScore({ categoryDetails, score }) {
  // NEED QUIZ RESULTS
  const router = useRouter()
  const [saveScoreStatus, setSaveScoreStatus] = React.useState({
    updating: false,
    updated: false,
    message: '',
  })

  return (
    <>
      <style jsx>
        {`
          .finalScreen {
            border: 2px dashed;
          }
          .finalScreen.easy {
            border-color: green;
          }
          .finalScreen.medium {
            border-color: yellow;
          }
          .finalScreen.hard {
            border-color: red;
          }
          .finalScreen .score {
            color: #fff;
            bold: 700;
          }
          h2,
          h3 {
            word-break: normal;
            margin: 0;
            margin-bottom: 0.5rem;
          }
        `}
      </style>
      <header>
        <h1>{categoryDetails.name || 'Category Name'}</h1>
        <p className={categoryDetails.difficulty}>
          {categoryDetails.difficulty || 'Category Difficulty'}
        </p>
      </header>
      <div className={`finalScreen container ${categoryDetails.difficulty}`}>
        {saveScoreStatus.updating ? (
          'Updating'
        ) : !saveScoreStatus.updated ? (
          <>
            <div style={{ color: '#f4a460', textAlign: 'center' }}>
              <h2 style={{ fontWeight: 400 }}>CONGRATULATIONS!</h2>
              <h3 style={{ fontWeight: 900 }}>YOUR SCORE: {score}</h3>
              <hr />
            </div>
            <InitialsForm
              saveScoreStatus={saveScoreStatus}
              setSaveScoreStatus={setSaveScoreStatus}
              docToInsert={{
                categoryDetails,
                score /* quiz */,
              }}
            />
          </>
        ) : (
          <Leaderboard category={categoryDetails.id} />
        )}
      </div>
      <button
        style={{ margin: '1em auto', display: 'block' }}
        type="button"
        onClick={() => router.reload()}
      >
        Try again!
      </button>
    </>
  )
}

export default FinalScore

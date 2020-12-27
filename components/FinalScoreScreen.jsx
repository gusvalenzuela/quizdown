import React from 'react'

function FinalScore({ category, difficulty, score }) {
  function saveToDatabase() {
    // console.log(event)
  }
  return (
    <>
      <style jsx>{`
        .easy {
          color: #ffffff;
        }
        .medium {
          color: #ffffff;
        }
        .hard {
          color: #ffffff;
        }
      `}</style>
      <div className="finalScreen container">
        <h1 className="title">{category || 'Category Name'}</h1>

        <p className="description">{difficulty || 'Category Difficulty'}</p>
        <p>Score: {score}</p>

        <button type="button" disabled onClick={saveToDatabase}>
          Enter Initials
        </button>
      </div>
    </>
  )
}

export default FinalScore

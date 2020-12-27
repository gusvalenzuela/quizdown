import React, { useState } from 'react'

function Play({ quiz, allAnswered, setAllAnswered }) {
  const [activeQuestion, setActiveQuestion] = useState(quiz.randomQuestion)

  const { category, difficulty, question } = activeQuestion

  function handleGrading(selectedAnswer) {
    if (selectedAnswer === quiz.answer(activeQuestion.id)) {
      // correct
      // console.log('answered correctly')
    } else {
      // incorrect
      // console.log('answered incorrectly')
    }
    // break if all questions have been answered
    if (quiz.alreadyAnswered.length === quiz.questions.length) {
      setAllAnswered(true)
      return
    }

    // set a new random question
    setActiveQuestion(quiz.randomQuestion)
  }
  return (
    <>
      <style jsx>
        {`
          .activeQuestion h2 {
            color: #ffffff;
            text-align: center;
          }
        `}
      </style>
      <div className="playScreen container">
        <h3 className="title">{category || 'Category Name'}</h3>

        <p className="description">{difficulty || 'Category Difficulty'}</p>

        <section className="activeQuestion">
          {activeQuestion && !allAnswered ? (
            <>
              <h2>{question}</h2>
              <article>
                {activeQuestion.choices.map((choice) => (
                  <button
                    type="button"
                    key={choice}
                    onClick={(e) => handleGrading(e.currentTarget.value)}
                    className="card"
                    value={choice}
                  >
                    {choice}
                  </button>
                ))}
              </article>
            </>
          ) : undefined}
        </section>
      </div>
    </>
  )
}

export default Play

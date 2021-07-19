import React, { useRef, useState, RefObject } from 'react'
import { Icon } from 'semantic-ui-react'
import Moment from 'react-moment'

function PlayScreen({ quiz, allAnswered, setAllAnswered, setFinalScore }) {
  const [activeQuestion, setActiveQuestion] = useState(quiz.randomQuestion) // start with a random question
  const [questionCount, setQuestionCount] = useState(1)
  const [grade, setGrade] = useState(null)
  const [timerOn, setTimerOn] = useState(true)
  const [timerStart] = useState(999)
  const [timerTime, setTimerTime] = useState(timerStart)
  const choicesRef: RefObject<any> = useRef()

  const { category, difficulty, question } = activeQuestion

  let gradingTimeout: any

  function handleGrading(selectedAnswer: string) {
    const correctAnswer = quiz.answer(activeQuestion.id)
    // // find the possible answers/choices for questions on DOM
    const choiceButtons = [...choicesRef.current.children]
    const selectedChoiceButton = choiceButtons?.filter(
      (c) => c.innerText === selectedAnswer
    )[0]
    const rightChoiceButton = choiceButtons?.filter(
      (c) => c.innerText === correctAnswer
    )[0]
    // change background of correct answer to green
    rightChoiceButton.style.backgroundColor = 'green'
    clearTimeout(gradingTimeout)
    // freeze the timer
    setTimerOn(false)

    // this will be updated below (+ score or - penalty) and set as
    // a new timerTime after a 2sec timeout
    let updatedTimerTime: number = timerTime

    // do what you will if answer is correct, else incorrect
    if (selectedAnswer === correctAnswer) {
      // console.log('answered correctly')
      let score: number
      switch (difficulty) {
        case 'hard':
          score = 25
          break
        case 'medium':
          score = 15
          break
        default:
          score = 7
      }
      setGrade(score)
      updatedTimerTime += score
    } else {
      let penalty: number
      switch (difficulty) {
        case 'hard':
          penalty = -20
          break
        case 'medium':
          penalty = -12
          break
        default:
          penalty = -5
      }
      // incorrect
      if (selectedChoiceButton) {
        // only if a choice was actually selected
        // change background of incorrect answer to red
        selectedChoiceButton.style.backgroundColor = 'red'
      }
      // console.log('answered incorrectly')
      setGrade(penalty)
      updatedTimerTime += penalty // penalties are < 0
    }

    // set timeout to display wrong/right answer
    gradingTimeout = window.setTimeout(() => {
      // break if all questions have been answered
      if (
        quiz.alreadyAnswered.length !== quiz.questions.length &&
        updatedTimerTime >= 0
      ) {
        setTimerTime(updatedTimerTime)
        // restart countdown
        setTimerOn(true)
        // set a new random question
        setActiveQuestion(quiz.randomQuestion)
        setQuestionCount(quiz.alreadyAnswered.length + 1)
        setGrade(null)
      } else {
        setAllAnswered(true)
        setFinalScore((updatedTimerTime && updatedTimerTime >= 0) || 0)
      }
    }, 2000)
  }

  return (
    <>
      <style jsx>
        {`
          .activeQuestion h2 {
            color: #ffffff;
            text-align: center;
            padding: 1rem;
          }
          header {
            background-color: #0003;
            color: var(--main-color, blue);
            text-align: center;
            margin: auto;
            margin-bottom: 1rem;
            width: 80%;
            max-width: 576px;
          }

          @media screen and (max-width: 576px) {
            header > h1 {
              font-size: 1.336rem;
              margin-bottom: 0.5rem;
            }

            .question-count,
            .countdown-timer {
              font-size: var(--heading-4);
            }
          }

          article {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          article .card {
            flex: 0.8 1 300px;
            margin: 0.25rem;
            padding: 1.5rem;

            font-weight: bolder;
            font-size: var(--heading-4);
            text-align: center;
            color: inherit;
            text-decoration: none;

            border: 1px solid transparent;
            border-radius: 4px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }

          .grade {
            font-weight: 700;
            font-size: var(--heading-3);
          }
          .timer-block {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            min-height: 50px;
            width: 100%;
            background-color: #ffffff00;
          }
          .countdown-timer,
          .question-count {
            position: relative;
            flex: 1 1 auto;
            color: #fff;
            font-weight: 800;
            font-size: var(--heading-3);
            padding: 0.5rem 1rem;
            text-align: center;
            margin: 0 1.3rem;
          }
          .grade-display {
            position: absolute;
            top: 2%;
            right: 5%;
            color: ${grade > 0 ? '#0f0' : '#f00'};
            font-weight: 600;
            font-size: var(--heading-4);
          }
        `}
      </style>
      <header>
        <h1>{category || 'Category Name'}</h1>
        <p className={`${difficulty}`}>{difficulty || 'Category Difficulty'}</p>
      </header>
      <div className="timer-block">
        {/* quick patch for a working "countdown timer"
        uses moment (react-moment) */}
        <Moment
          element="span"
          className="time"
          style={{ display: 'none' }}
          format="YYYY"
          onChange={() => {
            if (!timerOn) return
            setTimerTime(timerTime <= 0 ? 0 : timerTime - 1)
            if (timerTime <= 0) {
              handleGrading('no')
            }
          }}
        />
        <span className="question-count">
          Q: {questionCount} / {quiz.questions.length}
        </span>
        <span
          style={{ color: `${timerTime <= 10 && 'red'}` }}
          className="countdown-timer"
        >
          <Icon name="time" />
          {timerTime}
          <span id="grade-display" className="grade-display">
            {grade > 0 ? `+${grade}` : grade}
          </span>
        </span>
      </div>

      <div className="playScreen container">
        {activeQuestion && !allAnswered && (
          <section className="activeQuestion">
            <h2>{question}</h2>
            <article ref={choicesRef}>
              {activeQuestion.choices.map((choice: string) => (
                <button
                  disabled={timerTime <= 0 || !timerOn}
                  type="button"
                  key={choice}
                  onClick={(e) => handleGrading(e.currentTarget.value)}
                  className="card choices"
                  value={choice}
                >
                  {choice}
                </button>
              ))}
            </article>
          </section>
        )}
      </div>
    </>
  )
}

export default PlayScreen

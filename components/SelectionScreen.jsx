import React, { useState } from 'react'
import { Quiz } from '../lib/Quiz'
import SampleSet from '../lib/SampleQuizResponse'

function SelectionScreen({ categories, setQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  async function grabTriviaQsFromOpenTDB(
    category,
    difficulty = 'medium',
    amt = 10,
    type = 'multiple'
  ) {
    let queryStr = `https://opentdb.com/api.php?amount=${amt}&difficulty=${difficulty}&type=${type}&encode=url3986`

    if (category !== 'variety') {
      queryStr += `&category=${category}`
    }

    const res = await fetch(queryStr)
    return res.json()
  }

  async function handleRandomButtons(mode) {
    // category id chosen at random
    const randomID = Math.ceil(Math.random() * categories.length) + 8
    const data = await grabTriviaQsFromOpenTDB(randomID, mode)
    if (data.response_code === 0) setQuiz(new Quiz(data.results))
  }

  async function handlePlayButton() {
    // event.preventDefault();
    setQuiz(new Quiz(SampleSet.results))
    // if (!selectedCategory && !selectedDifficulty) return
    // const data = await grabTriviaQsFromOpenTDB(
    //   selectedCategory,
    //   selectedDifficulty
    // )
    // if (data.response_code === 0) setQuiz(new Quiz(data.results))
  }

  return (
    <>
      <style jsx>
        {`
          section {
            background-color: #eaeaea;
            color: #222;
            padding: 2rem;
          }
        `}
      </style>
      <section className="selection-screen">
        <form action="" id="quiz-options-form">
          <div className="row justify-content-center">
            <div className="input-group mb-3 col px-3" id="quiz-category-div">
              <div className="input-group-prepend">
                <label
                  className="input-group-text rounded-0"
                  htmlFor="inputGroupSelect01"
                >
                  Category:
                </label>
                <select
                  onBlur={(e) => {
                    // the category id is stored in id of its option element
                    setSelectedCategory(e.target.selectedOptions[0].id)
                  }}
                  id="quiz-options-select"
                  className="col"
                >
                  <option>Choose...</option>
                  <option id="variety">(Variety)</option>
                  {categories?.map((category) => (
                    <option id={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="input-group mb-3 col px-3" id="quiz-difficulty-div">
              <div className="input-group-prepend">
                <label
                  className="input-group-text rounded-0"
                  htmlFor="inputGroupSelect02"
                >
                  Difficulty:
                </label>
                <select
                  onBlur={(e) => {
                    setSelectedDifficulty(e.target.value.toLowerCase())
                  }}
                  id="quiz-options-select"
                  className="col"
                >
                  <option>Choose...</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <button
              type="button"
              className="play-btn"
              onClick={handlePlayButton}
            >
              PLAY!
            </button>
          </div>
          <div
            className="row"
            // style={{ display: 'none' }}
          >
            <p className="random">
              <span>Or play a random category on:</span>
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleRandomButtons('easy')}
                className="random-modes"
                id="easy-random"
              >
                easy,
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleRandomButtons('medium')}
                className="random-modes"
                id="medium-random"
              >
                medium,
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleRandomButtons('hard')}
                className="random-modes"
                id="hard-random"
              >
                hard.
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  )
}

export default SelectionScreen

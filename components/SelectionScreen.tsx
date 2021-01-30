import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Quiz } from '../lib/Quiz'
import { grabTriviaQsFromOpenTDB } from '../lib/api-helpers'
import SampleSet from '../lib/SampleQuizResponse'

const difficultyDropdownOptions = [
  {
    key: 'easy',
    text: 'Easy',
    value: 'easy',
  },
  {
    key: 'medium',
    text: 'Medium',
    value: 'medium',
  },
  {
    key: 'hard',
    text: 'Hard',
    value: 'hard',
  },
]

function SelectionScreen({ categories, setQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState(Number(-1))
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')

  async function handleRandomButtons(mode: 'easy' | 'medium' | 'hard') {
    // category id chosen at random
    const randomID = Math.ceil(Math.random() * categories.length) + 8
    const data = await grabTriviaQsFromOpenTDB(randomID, mode)
    if (data.response_code === 0) setQuiz(new Quiz(data.results))
  }

  async function handlePlayButton() {
    setQuiz(new Quiz(SampleSet.results))
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
            background-color: #eaeaea3a;
            color: #ffff;
            padding: 2rem;
          }
        `}
      </style>
      <section className="selection-screen">
        <form action="#" id="quiz-options-form">
          <div className="row justify-content-center">
            <div className="input-group mb-3 col px-3" id="quiz-category-div">
              <div className="input-group-prepend">
                <label
                  className="input-group-text rounded-0"
                  htmlFor="inputGroupSelect01"
                >
                  Category:
                  <Dropdown
                    id="category-dropdown"
                    labeled
                    search
                    selection
                    options={categories?.map((category) => ({
                      key: category.id,
                      text: category.name,
                      value: category.id,
                    }))}
                    placeholder="Choose..."
                    onChange={(e, { value }) => {
                      setSelectedCategory(Number(value))
                    }}
                    value={selectedCategory}
                  />
                  
                </label>
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
                  <Dropdown
                    id="difficulty-dropdown"
                    labeled
                    search
                    selection
                    options={difficultyDropdownOptions}
                    placeholder="Choose..."
                    onChange={(e, { value }) => {
                      setSelectedDifficulty(value.toString().toLowerCase())
                    }}
                    value={selectedDifficulty}
                  />
                </label>
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
                className="random-modes easy"
                id="easy-random"
              >
                easy,
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleRandomButtons('medium')}
                className="random-modes medium"
                id="medium-random"
              >
                medium,
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleRandomButtons('hard')}
                className="random-modes hard"
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

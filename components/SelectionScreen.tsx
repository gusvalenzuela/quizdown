import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Quiz } from '../lib/Quiz'
import { grabTriviaQsFromOpenTDB } from '../lib/api-helpers'
// import SampleSet from '../lib/SampleQuizResponse'

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
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')

  async function handleRandomButtons(mode: 'easy' | 'medium' | 'hard') {
    // category id chosen at random
    const randomID = Math.ceil(Math.random() * categories.length) + 8
    const data = await grabTriviaQsFromOpenTDB(randomID, mode)
    if (data.response_code === 0) setQuiz(new Quiz(data.results))
  }

  async function handlePlayButton() {
    // setQuiz(new Quiz(SampleSet.results))
    const data = await grabTriviaQsFromOpenTDB(
      selectedCategory,
      selectedDifficulty
    )

    if (data.response_code === 0) setQuiz(new Quiz(data.results))
  }

  return (
    <>
      <style jsx>
        {`
          section {
            color: #ffff;
            padding: 2rem;
          }

          label {
            display: flex;
            margin-bottom: 0.5rem;
            align-items: center;
            width: 100%;
          }
          form {
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .play-btn {
            text-decoration: none;
            border: none;
            border-bottom: 1px ridge #2f231c;
            line-height: 50px;
            color: white;
            background: #006999;
          }

          .play-btn:hover {
            color: #006999;
            text-decoration: none;
            background: #2f231c;
          }
          .random {
            clear: both;
            color: white;
            font-size: var(--base-font-size);
            text-align: center;
          }
          .random > span {
            padding: 0.25rem;
          }

          .random-modes:hover {
            color: #006999;
            text-decoration: underline;
            cursor: pointer;
          }
        `}
      </style>
      <section className="selection-screen container">
        <form action="#" id="quiz-options-form">
          <label className="">
            Category:
            <Dropdown
              id="category-dropdown"
              labeled
              // search
              selection
              fluid
              options={categories
                ?.map((category: { id: string; name?: string }) => ({
                  key: category.id,
                  text: category.name,
                  value: category.id,
                }))
                .concat([
                  {
                    // add an extra "Variety" option
                    // defaults to -1 value, which returns q's from variety of categories
                    key: -1,
                    text: '-- Variety of Categories --',
                    value: -1,
                  },
                ])}
              onChange={(e, { value }) => {
                setSelectedCategory(Number(value))
              }}
              placeholder="Choose..."
              value={selectedCategory}
            />
          </label>
          <label className="">
            Difficulty:
            <Dropdown
              id="difficulty-dropdown"
              labeled
              selection
              fluid
              options={difficultyDropdownOptions}
              placeholder="Choose..."
              onChange={(e, { value }) => {
                setSelectedDifficulty(value.toString().toLowerCase())
              }}
              value={selectedDifficulty}
            />
          </label>
          <button type="button" className="play-btn" onClick={handlePlayButton}>
            PLAY!
          </button>
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

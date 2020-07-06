import { useState } from "react";

function SelectionScreen({ categories, setQuestions }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  function handleRandomButtons() {
    // category id chosen at random
    let randomID = Math.ceil(Math.random() * categories.length) + 8;
    switch (event.target.id) {
      case `medium-random`:
        // pullTriviaQuestions(amtSelected, randomID, `medium`);
        console.log(`med rando`, randomID);
        break;
      case `hard-random`:
        // pullTriviaQuestions(amtSelected, randomID, `hard`);
        console.log(`hard rando`, randomID);
        break;
      default:
        console.log(`easy rando`, randomID);
        // pullTriviaQuestions(amtSelected, randomID, `easy`);
        break;
    }
  }

  async function handlePlayButton() {
    event.preventDefault();

    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple&encode=url3986`
    );
    const data = await res.json();
    const qs = [];

    data.results.forEach((q) => {
      let question = {};
      question.answer = decodeURIComponent(q.correct_answer);
      question.choices = q.incorrect_answers.map((i) => decodeURIComponent(i));
      question.choices.push(decodeURIComponent(q.correct_answer));
      question.title = decodeURIComponent(q.question);

      qs.push(question);
    });

    let qObj = {
      category: {
        id: selectedCategory,
        name: decodeURIComponent(data.results[0].category),
        difficulty: decodeURIComponent(data.results[0].difficulty),
      },
      questions: qs,
    };
    setQuestions(qObj);
  }

  return (
    // selection screen holder wrapped in a form
    <form action="" id="quiz-options-form">
      <section className="selection-screen">
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
                onChange={(e) => {
                  // the category id is stored in id of its option element
                  setSelectedCategory(Number(e.target.selectedOptions[0].id));
                }}
                id="quiz-options-select"
                className="col"
              >
                <option>Choose...</option>
                <option>(Random Category)</option>
                {categories.map((category, ix) => {
                  return (
                    <option id={category.id} key={ix}>
                      {category.name}
                    </option>
                  );
                })}
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
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value.toLowerCase());
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
          <button className="mb-3 col-6 play-btn" onClick={handlePlayButton}>
            PLAY!
          </button>
        </div>
        <div
          className="row justify-content-center mt-3"
          style={{ display: "none" }}
        >
          <p className="random">
            <span>Or play a random category on:</span>
            <span
              onClick={handleRandomButtons}
              className="random-modes"
              id="easy-random"
            >
              easy,
            </span>
            <span
              onClick={handleRandomButtons}
              className="random-modes"
              id="medium-random"
            >
              medium,
            </span>
            <span
              onClick={handleRandomButtons}
              className="random-modes"
              id="hard-random"
            >
              hard.
            </span>
          </p>
        </div>
      </section>
    </form>
  );
}

export default SelectionScreen;

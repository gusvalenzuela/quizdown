import Head from "next/head";
import { useState, useEffect } from "react";
import Styles from "../PlayScreen/PlayScreen.module.css";
import FinalScoreScreen from "../FinalScoreScreen";

function Play({ category, questions }) {
  const [currentQuestionsSet, setCurrentQuestionsSet] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  function randomizeQuestionSet() {
    let tempSet = [...questions];
    let newSet = [];

    for (let i = tempSet.length; i > 0; i--) {
      let r = Math.floor(Math.random() * tempSet.length); // a random index
      const randomizedQuestion = tempSet[r]; // selecting a question from our tempSet a the random index
      const tempChoices = randomizedQuestion.choices;
      randomizedQuestion.choices = [];

      //   looping through choices to randomize
      for (let c = tempChoices.length; c > 0; c--) {
        let r2 = Math.floor(Math.random() * tempChoices.length); // a random index
        randomizedQuestion.choices.push(tempChoices[r2]);
        tempChoices.splice(r2, 1);
      }

      newSet.push(randomizedQuestion);
      tempSet.splice(r, 1);
    }

    setCurrentQuestionsSet(newSet);
    setActiveQuestion(newSet[newSet.length - 1]);
  }

  useEffect(() => {
    randomizeQuestionSet();
  }, []);

  function gradeAnswer() {
    if (event.target.value === activeQuestion.answer) {
      console.log(`RIGHT!`);
    } else {
      console.log(`Wrong!`);
    }

    currentQuestionsSet.pop();
    setActiveQuestion(currentQuestionsSet[currentQuestionsSet.length - 1]);
  }
  return (
    <div className="container">
      <Head>
        <title>
          {category.name || "Category Name"} .
          {category.difficulty || "Category Difficulty"}
        </title>
      </Head>

      <h1 className="title">{category.name || "Category Name"}</h1>

      <p className="description">
        {category.difficulty || "Category Difficulty"}
      </p>

      <div className={`grid ${Styles.activeQuestion}`}>
        {activeQuestion ? (
          <>
            <h3>{activeQuestion.title}</h3>
            {activeQuestion.choices.map((choice, index) => {
              return (
                <button
                  key={index}
                  onClick={gradeAnswer}
                  className="card"
                  value={choice}
                >
                  {choice}
                </button>
              );
            })}
          </>
        ) : (
          <FinalScoreScreen category={category} />
        )}
      </div>
    </div>
  );
}

export default Play;

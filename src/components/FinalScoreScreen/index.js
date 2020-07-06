// import Styles from "../FinalScoreScreen/FinalScoreScreen.module.css";

function FinalScore({ category }) {
  function saveToDatabase() {
    console.log(event);
  }
  return (
    <div className="container">
      <h1 className="title">{category.name || "Category Name"}</h1>

      <p className="description">
        {category.difficulty || "Category Difficulty"}
      </p>

      <button disabled onClick={saveToDatabase}>
        Enter Initials
      </button>
    </div>
  );
}

export default FinalScore;

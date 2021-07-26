import { randomizeArray } from './utils'

export class Quiz {
  constructor(questions, categoryId) {
    // save incoming answers on their own
    // these will have correct_answer used for grading
    this.answers = questions.map((q) => decodeURIComponent(q.correct_answer))
    // add id to all questions corresponding to their index
    // this is used later when grading
    // correct and incorrect merged into "choices"
    this.questions = questions.map((q, index) => ({
      id: index,
      choices: randomizeArray(
        q.incorrect_answers
          .map((a) => decodeURIComponent(a))
          .concat(decodeURIComponent(q.correct_answer))
      ),
      question: decodeURIComponent(q.question),
      difficulty: q.difficulty,
      type: q.type,
      category: decodeURIComponent(q.category),
    }))

    this.alreadyAnswered = []
    this.difficulty = questions[0].difficulty
    // if all questions contain same category (as first) set category accordingly
    // else set category as "Variety..."
    this.category = questions.every((q) => q.category === questions[0].category)
      ? decodeURIComponent(questions[0].category)
      : 'Variety of Categories'

    this.categoryId = categoryId // saving Id used
  }

  get completed() {
    return this.alreadyAnswered.length
  }

  get randomQuestion() {
    return this.getRandomQuestion()
  }

  getRandomQuestion() {
    // filter out any questions whose id is included
    // in list of graded questions
    const unansweredQuestions = this.questions.filter(
      (q) => !this.alreadyAnswered.includes(q.id)
    )
    const r = Math.floor(Math.random() * unansweredQuestions.length)

    return unansweredQuestions[r]
  }

  answer(id) {
    // save the id of returned answered on list
    // to check against when pulling random Questions
    if (!this.alreadyAnswered.includes(id)) {
      this.alreadyAnswered.push(id)
    }
    return this.answers[id]
  }
}

// take only needed user fields to avoid sensitive ones (such as password)
export function extractUser(req) {
  if (!req.user) return null
  const { _id, name, email, bio, profilePicture, emailVerified } = req.user
  return {
    _id,
    name,
    email,
    bio,
    profilePicture,
    emailVerified,
  }
}

export async function grabTriviaQsFromOpenTDB(
  category,
  difficulty = 'medium',
  amt = 10,
  type = 'multiple'
) {
  // find how many questions are available for the given category
  const questionCounts = await fetch(
    `https://opentdb.com/api_count.php?category=${category}`
  ).then((q) => q.json())

  // then "filter" out the count for the chosen difficulty
  const countAvailable =
    questionCounts.category_question_count[`total_${difficulty}_question_count`]

  // finally, use the filtered count as amount in fetch queryStr

  let queryStr = `https://opentdb.com/api.php?amount=${
    countAvailable < amt ? countAvailable : amt
  }&difficulty=${difficulty}&type=${type}&encode=url3986`

  if (category > 0) {
    queryStr += `&category=${category}`
  }

  const res = await fetch(queryStr)

  return res.json()
}

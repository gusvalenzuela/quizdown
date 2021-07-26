export async function getUser(req, userId) {
  const user = await req.db.collection('users').findOne({
    _id: userId,
  })
  if (!user) return null
  const { _id, name, email, bio, profilePicture, emailVerified } = user
  const isAuth = _id === req.user?._id
  return {
    _id,
    name,
    email: isAuth ? email : null,
    bio,
    profilePicture:
      profilePicture ||
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-user'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E",
    emailVerified: isAuth ? emailVerified : null,
  }
}

const { DB_NAME } = process.env

export async function saveScoresToDB(
  client,
  initials,
  score,
  category,
  quiz = {}
) {
  let responseMessage
  let err
  // update/insert new score into DB (scores)
  try {
    await client.connect()
    const scores = client.db(DB_NAME).collection('scores')
    // create a document to be inserted
    const doc = { initials, score, dateEntered: Date.now(), quiz, category }
    const result = await scores.insertOne(doc)
    if (result.acknowledged) responseMessage = 'success'
  } catch (error) {
    err = error
    responseMessage = 'Unexpected Error'
  } finally {
    await client.close()
  }

  return { message: responseMessage, err }
  // return the confirmation
}

export async function getLeaderboard(db, categoryId) {
  const scoresByCategory = await db
    .collection('scores')
    .find({ 'category.id': Number(categoryId) })
    .project({ _id: 0 })
    .sort({ score: -1 })
    .toArray()

    // return only the 1st ten scores (i.e. "top ten")
  return { leaderboard: [...scoresByCategory].slice(0, 10) }
}

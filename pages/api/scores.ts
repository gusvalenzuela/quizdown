import nextConnect from 'next-connect'
import type { NextApiResponse } from 'next'
import type { CustomNextApiRequest } from '../../additional'
import middleware from '../../middlewares/middleware'
import { saveScoresToDB } from '../../lib/db'

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { initials, score, categoryDetails, quiz } = JSON.parse(req.body)
  const { dbClient } = req

  res.json(await saveScoresToDB(dbClient, initials, score, categoryDetails, quiz))
})

export default handler

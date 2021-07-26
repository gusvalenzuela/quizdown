import nextConnect from 'next-connect'
import type { NextApiResponse } from 'next'
import type { CustomNextApiRequest } from '../../additional'
import middleware from '../../middlewares/middleware'
import { getLeaderboard } from '../../lib/db'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { categoryId } = req.query
  const { db } = req
  if (!categoryId) return res.json(null)

  return res.json(await getLeaderboard(db, categoryId))
})

export default handler

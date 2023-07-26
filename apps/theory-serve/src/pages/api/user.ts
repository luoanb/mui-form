import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// POST /api/user
// Required fields in body: name, email
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  const result = await prisma.user.create({
    data: {
      ...req.body
    }
  })
  return res.status(201).json(result)
}

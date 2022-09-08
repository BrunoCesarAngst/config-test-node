import type { NextApiRequest, NextApiResponse } from 'next'
import { create } from '../../../lib/db'
import { ISubmitPartUsecase } from '../../tests/submit_part_usecase.test'

export default async function (
  req: NextApiRequest, res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data: ISubmitPartUsecase = JSON.parse(req.body)
    await create(data)
    return res.status(200).json({ message: 'Success' })
  }
}

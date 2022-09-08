import { Parts } from '@prisma/client'
import { ISubmitPartUsecase } from 'tests/submit_part_usecase.test'
import { prisma } from './prisma'

export async function create ({ name, description }: ISubmitPartUsecase): Promise<void> {
  await prisma.parts.create({
    data: {
      name,
      description
    }
  })
}

export async function getAll (): Promise<Parts[]> {
  const data: Parts[] = await prisma.parts.findMany()
  return data
}

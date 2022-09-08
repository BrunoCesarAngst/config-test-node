import { prisma } from '../prisma'

export interface ISubmitPartUsecase {
  name: string
  description: string
}

export interface ISubmitPartRepository {
  create: (dataPart: ISubmitPartUsecase) => Promise<void>
}

export class SubmitPartRepository implements ISubmitPartRepository {
  async create (dataPart: ISubmitPartUsecase): Promise<void> {}
}

export class SubmitPartUsecase {
  constructor (private readonly submitPartRepository: ISubmitPartRepository) {}

  async execute (dataPart: ISubmitPartUsecase): Promise<void> {
    const { name, description } = dataPart

    if (!name) {
      throw new Error('Name is required')
    }

    if (!description) {
      throw new Error('Name is required')
    }

    await this.submitPartRepository.create({
      name,
      description
    })
  }
}

export class PrismaPartRepository implements ISubmitPartRepository {
  async create ({ name, description }: ISubmitPartUsecase): Promise<void> {
    await prisma.parts.create({
      data: {
        name,
        description
      }
    })
  }
}

const createPartSpy = jest.fn()

const submitPartUsecase = new SubmitPartUsecase({ create: createPartSpy })

describe('SubmitPartUsecase', (): void => {
  it('Should be called', async (): Promise<void> => {
    await submitPartUsecase.execute({
      name: 'test',
      description: 'test description'
    })

    expect(createPartSpy).toHaveBeenCalled()
  })

  it('Should be able to create an error-free piece', async (): Promise<void> => {
    await expect(
      submitPartUsecase.execute({
        name: 'test',
        description: 'test description'
      })
    ).resolves.not.toThrow()
  })

  it('Should not be able to create a part without name', async (): Promise<void> => {
    await expect(
      submitPartUsecase.execute({
        name: '',
        description: 'test description'
      })
    ).rejects.toThrow()
  })

  it('Should not be able to create a part without description', async (): Promise<void> => {
    await expect(
      submitPartUsecase.execute({
        name: 'test',
        description: ''
      })
    ).rejects.toThrow()
  })
})

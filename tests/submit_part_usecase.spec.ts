export interface ISubmitPartUsecase {
  name: string
  description: string
}

export class SubmitPartUsecase {
  callCounts = 0
  constructor (private readonly submitPartRepository: ISubmitPartRepository) {}

  async execute ({ name, description }: ISubmitPartUsecase): Promise<ISubmitPartUsecase> {
    this.callCounts++
    return await this.submitPartRepository.create({ name, description })
  }
}

export interface ISubmitPartRepository {
  create: (dataPart: ISubmitPartUsecase) => Promise<ISubmitPartUsecase>
}

export class SubmitPartRepositoryMock implements ISubmitPartRepository {
  async create ({ name, description }: ISubmitPartUsecase): Promise<ISubmitPartUsecase> {
    return {
      name,
      description
    }
  }
}

describe('SubmitPartUsecase', () => {
  it('Should be able to create a part', async () => {
    const submitPartRepository = new SubmitPartRepositoryMock()
    const sut = new SubmitPartUsecase(submitPartRepository)
    const aPart: ISubmitPartUsecase = {
      name: 'test',
      description: 'test description'
    }

    // expect((await sut.execute(aPart)))
    //   .toEqual((await submitPartRepository.create(aPart)))
    expect((await sut.execute(aPart))).toEqual(aPart)
    expect(aPart).toEqual((await submitPartRepository.create(aPart)))
  })

  it('Should be activated once per call', async () => {
    const submitPartRepository = new SubmitPartRepositoryMock()
    const sut = new SubmitPartUsecase(submitPartRepository)
    const aPart: ISubmitPartUsecase = {
      name: 'test',
      description: 'test description'
    }

    await sut.execute(aPart)
    await submitPartRepository.create(aPart)

    expect((sut.callCounts)).toBe(1)
  })
})

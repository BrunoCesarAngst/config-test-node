class CreatingAPart {
  constructor (private readonly creatingAPartRepository: CreatingAPartRepository) {}

  async create (part: string): Promise<void> {
    await this.creatingAPartRepository.create(part)
  }
}

interface CreatingAPartRepository {
  create: (part: string) => Promise<void>
}

class CreatingAPartRepositoryMock implements CreatingAPartRepository {
  part?: string
  callsCount =  0

  async create (part: string): Promise<void> {
    this.part = part
    this.callsCount++
  }
}

describe('CreatingAPart', () => {
  it('Should create a new part station', () => {
    const creatingAPartRepository = new CreatingAPartRepositoryMock()
    const sut = new CreatingAPart(creatingAPartRepository)

    expect(sut).toBeInstanceOf(CreatingAPart)
  })

  it('Should be called only once', async () => {
    const creatingAPartRepository = new CreatingAPartRepositoryMock()
    const sut = new CreatingAPart(creatingAPartRepository)

    await sut.create('part')

    expect(creatingAPartRepository.callsCount).toBe(1)
  })

  it('Should create a new part', async () => {
    const creatingAPartRepository = new CreatingAPartRepositoryMock()
    const sut = new CreatingAPart(creatingAPartRepository)

    await sut.create('part')

    expect(creatingAPartRepository.part).toBe('part')
  })
})

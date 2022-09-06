class CreatingAPart {
  name: string

  constructor (
    private readonly creatingAPartRepository: CreatingAPartRepository,
    name: string
    ) {
      this.name = name
    }

  async create (part: string): Promise<void> {
    await this.creatingAPartRepository.create(part)
  }
}

interface CreatingAPartRepository {
  create: (part: string) => Promise<void>
  name?: string
  
}

class CreatingAPartRepositoryMock implements CreatingAPartRepository {
  part?: string
  callsCount =  0
  name?: string

  async create (part: string): Promise<void> {
    this.part = part
    this.callsCount++
  }
}

describe('CreatingAPart', () => {
  it('Should create a new part station', () => {
    const creatingAPartRepository = new CreatingAPartRepositoryMock()
    const sut = new CreatingAPart(creatingAPartRepository, '')

    expect(sut).toBeInstanceOf(CreatingAPart)
  })

  it('Should be called only once', async () => {
    const creatingAPartRepository = new CreatingAPartRepositoryMock()
    const sut = new CreatingAPart(creatingAPartRepository, '')

    await sut.create('part')

    expect(creatingAPartRepository.callsCount).toBe(1)
  })

  it('Should create a new part', async () => {
    const creatingAPartRepository = new CreatingAPartRepositoryMock()
    const sut = new CreatingAPart(creatingAPartRepository, '')

    await sut.create('part')

    expect(creatingAPartRepository.part).toBe('part')
  })
})

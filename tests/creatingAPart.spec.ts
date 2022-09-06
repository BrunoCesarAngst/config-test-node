
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

  async create (part: string): Promise<void> {
    this.part = part
  }
}

describe('CreatingAPart', () => {
  it('Should create a new part station', () => {
    const creatingAPartRepository = new CreatingAPartRepositoryMock()
    const creatingAPart = new CreatingAPart(creatingAPartRepository)

    expect(creatingAPart).toBeInstanceOf(CreatingAPart)
  })

  it('Should create a new part', async () => {
    const creatingAPartRepository = new CreatingAPartRepositoryMock()
    const creatingAPart = new CreatingAPart(creatingAPartRepository)

    await creatingAPart.create('part')

    expect(creatingAPartRepository.part).toBe('part')
  })
})

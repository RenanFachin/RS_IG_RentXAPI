import { Repository, getRepository } from 'typeorm'
import { Specification } from '../entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../../../repositories/ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>
  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    })

    await this.repository.save(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOne({
      name,
    })

    if (specification === undefined) {
      return null
    }

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids)

    return specifications
  }
}

export { SpecificationsRepository }

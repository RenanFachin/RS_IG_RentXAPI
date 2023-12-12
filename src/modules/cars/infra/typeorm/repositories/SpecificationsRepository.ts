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

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.repository.findOne({
      name,
    })

    if (specification === undefined) {
      return null
    }

    return specification
  }
}

export { SpecificationsRepository }

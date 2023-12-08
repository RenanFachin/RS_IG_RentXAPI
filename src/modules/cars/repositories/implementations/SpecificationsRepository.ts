import { Specification } from '../../model/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  // criando a tabela "fake" para armazenar as especificações
  private specificationsTable: Specification[]

  constructor() {
    this.specificationsTable = []
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    // Ao instanciar o specification, o construtor da classe vai gerar o id
    const specificationData = new Specification()

    // Passando o restante dos dados necessários para criar uma specification
    Object.assign(specificationData, {
      name,
      description,
      created_at: new Date(),
    })

    this.specificationsTable.push(specificationData)
  }

  findByName(name: string): Specification | null {
    const specification = this.specificationsTable.find(
      (specification) => specification.name === name,
    )

    if (specification === undefined) {
      return null
    }

    return specification
  }
}

export { SpecificationsRepository }

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationUseCase {
  // O construtor do UseCase vai receber a interface para implementação do repository
  // eslint-disable-next-line no-useless-constructor
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ description, name }: IRequest): void {
    // Verificando se já existe uma especificação com este nome
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists')
    }

    this.specificationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }

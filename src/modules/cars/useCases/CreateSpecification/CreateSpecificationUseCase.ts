import { inject, injectable } from 'tsyringe'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'
import { AppError } from '../../../../errors/AppError'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  // O construtor do UseCase vai receber a interface para implementação do repository
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) { }

  async execute({ description, name }: IRequest): Promise<void> {
    // Verificando se já existe uma especificação com este nome
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists')
    }

    await this.specificationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }

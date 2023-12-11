import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  // SOLID - Inversão de dependência
  // ICategoriesRepository -> é o contrato, ou seja, atende ao principio de liskov
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({ name, description }: IRequest): Promise<void> {
    // Verificando se já existe uma categoria com este nome
    const categoryAlreadyExists =
      await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category already exists')
    }

    // Utilizando o repository, para que ele faça a conexão com o db e registre
    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }

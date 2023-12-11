import { inject, injectable } from 'tsyringe'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

@injectable()
class ListCategoriesUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  // Método execute retorna um array de Categorias
  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}

export { ListCategoriesUseCase }

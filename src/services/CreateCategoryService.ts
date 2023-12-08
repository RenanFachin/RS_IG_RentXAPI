import { CategoriesRepository } from '../repositories/CategoriesRepository'

interface IRequest {
  name: string
  description: string
}

// O service não deve conhecer o request e o response
// service não precisa conhecer qual o banco de dados e nem nada
class CreateCategoryService {
  // SOLID - Inversão de dependência
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    // Verificando se já existe uma categoria com este nome
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category already exists')
    }

    // Utilizando o repository, para que ele faça a conexão com o db e registre
    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryService }

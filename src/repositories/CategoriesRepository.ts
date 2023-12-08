import { Category } from '../model/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  // Definindo que categoryas deve serguir as tipagens do model Category, que é um array
  private categories: Category[]

  constructor() {
    // inicializando categories como vazio
    this.categories = []
  }

  // Create é responsável por registrar algo dentro do array categories
  // DTO -> Data Transfer Object: Responsável por passar os dados entre as camadas
  create({ name, description }: ICreateCategoryDTO) {
    // Instanciando a classe Category
    const category = new Category()

    // Adicionando os dados necessários
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })

    this.categories.push(category)
  }

  // O retorno no método LIST é um array de Category
  list(): Category[] {
    return this.categories
  }

  findByName(name: string) {
    const category = this.categories.find((category) => category.name === name)

    return category
  }
}

export { CategoriesRepository }

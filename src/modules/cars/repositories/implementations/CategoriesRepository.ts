import { Category } from '../../model/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

// implements ICategoriesRepository -> É o princípio de substituição de liskov
class CategoriesRepository implements ICategoriesRepository {
  // Definindo que categoryas deve serguir as tipagens do model Category, que é um array
  private categories: Category[]

  // SINGLETON PATTERN
  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository

  // O construtor agora é private para garantir o singleton pattern, somente a classe CategoriesRepository poderá chamar o construtor
  private constructor() {
    // inicializando categories como vazio
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    // Caso INSTANCE não tenha nenhum valor atribuido
    if (!CategoriesRepository.INSTANCE) {
      // Criando uma instancia
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    // Caso já exista uma instância criada, somente retornar
    return CategoriesRepository.INSTANCE
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

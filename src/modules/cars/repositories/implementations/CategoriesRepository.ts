import { Repository, getRepository } from 'typeorm'
import { Category } from '../../entities/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

// implements ICategoriesRepository -> É o princípio de substituição de liskov
class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  // O construtor agora é private para garantir o singleton pattern, somente a classe CategoriesRepository poderá chamar o construtor
  constructor() {
    this.repository = getRepository(Category)
  }

  // Create é responsável por registrar algo dentro do array categories
  // DTO -> Data Transfer Object: Responsável por passar os dados entre as camadas
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    // É preciso utilizar o .create para criar um objeto e depois salvar no db
    const category = this.repository.create({
      description,
      name,
    })

    // Salvando os dados no db
    await this.repository.save(category)
  }

  // O retorno no método LIST é um array de Category
  async list(): Promise<Category[]> {
    const categories = await this.repository.find()

    return categories
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({
      name,
    })

    if (category === undefined) {
      return null
    }

    return category
  }
}

export { CategoriesRepository }

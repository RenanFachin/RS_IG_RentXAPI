import { Category } from '../entities/Category'

// Criando o DTO
export interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoriesRepository {
  findByName(name: string): Category | undefined
  list(): Category[]
  create({ name, description }: ICreateCategoryDTO): void
}

export { ICategoriesRepository }

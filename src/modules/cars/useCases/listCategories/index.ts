import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

// O useCase precisa do repository para ser instanciado
const listCategoriesRepository = null

// Controller precisa do useCase para ser instanciado
const listCategoriesUseCase = new ListCategoriesUseCase(
  listCategoriesRepository,
)
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
)

export { listCategoriesController }

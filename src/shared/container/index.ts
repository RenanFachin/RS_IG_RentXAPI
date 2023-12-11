import { container } from 'tsyringe'
// Categories
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository'
// Specifications
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
)

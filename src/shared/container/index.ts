import { container } from 'tsyringe'
// Categories
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository'
// Specifications
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository'
// Users
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

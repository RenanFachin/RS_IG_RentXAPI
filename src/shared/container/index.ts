import { container } from 'tsyringe'

import './providers'

// Categories
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository'
// Specifications
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository'
// Users
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
// Cars
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository'
// Import Car images
import { ICarsImagesRepository } from '../../modules/cars/repositories/ICarsImagesRepository'
import { CarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImagesRepository'
// Rentals
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository'

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

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
)

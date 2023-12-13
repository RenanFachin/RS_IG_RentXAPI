import { AppError } from '../../../../shared/errors/AppError'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })
  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description CAr',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })
  })

  it('should not be able to create a car with same license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'CAR1',
        description: 'Description CAr',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      })

      await createCarUseCase.execute({
        name: 'CAR2',
        description: 'Description CAr',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to register a car with the property available true as default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car available',
      description: 'Description CAr',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })

    expect(car.available).toBeTruthy()
  })
})

import { AppError } from '../../../../shared/errors/AppError'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationInMemory } from '../../repositories/in-memory/SpecificationInMemory'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationInMemory: SpecificationInMemory
describe('Create car specification', () => {
  beforeEach(() => {
    specificationInMemory = new SpecificationInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationInMemory,
    )
  })

  it('should be able to add a new specification to car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description CAr',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })

    const specification = await specificationInMemory.create({
      description: 'teste',
      name: 'teste',
    })

    const specifications_id = [specification.id]

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })

  it('should not be able to add a new specification to an inexistent car', () => {
    expect(async () => {
      const car_id = '1234'
      const specifications_id = ['54321']

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})

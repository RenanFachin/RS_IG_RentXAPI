import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car descrition',
      daily_rate: 250,
      license_plate: 'DEF-12345',
      fine_amount: 0,
      brand: 'Car brand',
      category_id: 'category_id',
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car descrition',
      daily_rate: 250,
      license_plate: 'DEF-12345',
      fine_amount: 0,
      brand: 'Car_brand_test',
      category_id: 'category_id',
    })

    const cars = await listCarsUseCase.execute({
      brand: 'Car_brand_test',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Car descrition',
      daily_rate: 250,
      license_plate: 'DEF-12345',
      fine_amount: 0,
      brand: 'Car_brand_test',
      category_id: 'category_id',
    })

    const cars = await listCarsUseCase.execute({
      name: 'Car3',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car4',
      description: 'Car descrition',
      daily_rate: 250,
      license_plate: 'DEF-12345',
      fine_amount: 0,
      brand: 'Car_brand_test',
      category_id: 'category_id4',
    })

    const cars = await listCarsUseCase.execute({
      category_id: 'category_id4',
    })

    expect(cars).toEqual([car])
  })
})

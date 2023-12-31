import { Repository, getRepository } from 'typeorm'
import { ICreateCarDTO } from '../../../dtos/ICreateCarDTO'
import {
  ICarsRepository,
  IFindAvailableDTO,
} from '../../../repositories/ICarsRepository'
import { Car } from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    // Criando a referência
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    })

    // Salvando no db
    await this.repository.save(car)

    // Retornando um <Car>
    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    })

    return car
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IFindAvailableDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand })
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name })
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id)

    return car
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute()

    // UPDATE cars SET avalable = 'true' WHERE id = :id
  }
}

export { CarsRepository }

import { Repository, getRepository } from 'typeorm'
import { ICreateCarDTO } from '../../../dtos/ICreateCarDTO'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
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
}

export { CarsRepository }

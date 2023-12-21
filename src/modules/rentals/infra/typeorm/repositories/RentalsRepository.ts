import { Repository, getRepository } from 'typeorm'
import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO'
import { IRentalsRepository } from '../../../repositories/IRentalsRepository'
import { Rental } from '../entities/Rental'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    })

    return openByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    })

    return openByUser
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rentalDetails = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    })

    await this.repository.save(rentalDetails)

    return rentalDetails
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id)

    return rental
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    })

    return rentals
  }
}

export { RentalsRepository }

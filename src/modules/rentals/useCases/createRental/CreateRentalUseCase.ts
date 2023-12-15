import { AppError } from '../../../../shared/errors/AppError'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) { }

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const isCarUnavailable =
      await this.rentalsRepository.findOpenRentalByCarId(car_id)

    if (isCarUnavailable) {
      throw new AppError('Car is unavailable')
    }

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for this user')
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    return rental
  }
}

export { CreateRentalUseCase }

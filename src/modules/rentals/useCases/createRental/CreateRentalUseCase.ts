import { IDateProvider } from '../../../../shared/container/providers/dateProvider/IDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider,
  ) { }

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumNumberOfHoursForRental = 24

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

    // Comparando a data de retorno com a atual (em horas)
    const dateNow = this.dateProvider.dateNow()
    const compare = this.dateProvider.compareInHours(
      expected_return_date,
      dateNow,
    )

    if (compare < minimumNumberOfHoursForRental) {
      throw new AppError('Rental must be for a minimum of 24 hours')
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

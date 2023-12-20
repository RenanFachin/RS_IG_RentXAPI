import { inject, injectable } from 'tsyringe'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { AppError } from '../../../../shared/errors/AppError'
import { IDateProvider } from '../../../../shared/container/providers/dateProvider/IDateProvider'
import { Rental } from '../../infra/typeorm/entities/Rental'

interface IRequest {
  id: string
  user_id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayJSDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)
    const minimum_daily = 1

    if (!rental) {
      throw new AppError('This rental does not exist.')
    }

    // Verificar o tempo do aluguel
    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow(),
    )

    if (daily <= 0) {
      daily = minimum_daily // assumindo o valor mínimo da entrega para 1 diária
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    )

    // Caso tiver atraso na entrega previsto
    let total = 0
    if (delay < 0) {
      const calculate_fine_amount = delay * car.fine_amount
      total = calculate_fine_amount
    }

    total = total + daily * car.daily_rate

    // Atualizando para o horário da entrega
    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true) // atualizando o status do carro para disponível

    return rental
  }
}

export { DevolutionRentalUseCase }

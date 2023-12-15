import { DayJSDateProvider } from '../../../../shared/container/providers/dateProvider/implementations/DayJSDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import dayjs from 'dayjs'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJSDateProvider: DayJSDateProvider

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    dayJSDateProvider = new DayJSDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJSDateProvider,
    )
  })
  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '211212',
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open to the same user', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '211212',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '211212',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if there is another open to the same user', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'teste',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        user_id: '321',
        car_id: 'teste',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental with invalid return time (less than 24 hours)', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'teste',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})

import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

@injectable()
class CreateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      driver_license: data.driver_license,
    })
  }
}

export { CreateUserUseCase }

import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
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
    // Checando se o email já está em uso
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error('User Already Exists')
    }

    // Criptografia de password
    const passwordHash = await hash(data.password, 8)

    await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
      driver_license: data.driver_license,
    })
  }
}

export { CreateUserUseCase }

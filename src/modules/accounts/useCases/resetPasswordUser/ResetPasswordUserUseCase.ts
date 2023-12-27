import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { AppError } from '../../../../shared/errors/AppError'
import { IDateProvider } from '../../../../shared/container/providers/dateProvider/IDateProvider'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJSDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token invalid!')
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Token expired!')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    // Alterando a senha do usuário
    user.password = await hash(password, 8)
    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUserUseCase }

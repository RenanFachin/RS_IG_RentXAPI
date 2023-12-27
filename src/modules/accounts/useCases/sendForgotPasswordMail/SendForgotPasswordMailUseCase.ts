import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { AppError } from '../../../../shared/errors/AppError'
import { v4 as uuidV4 } from 'uuid'
import { IDateProvider } from '../../../../shared/container/providers/dateProvider/IDateProvider'
import { IMailProvider } from '../../../../shared/container/providers/mailProvider/IMailProvider'

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJSDateProvider')
    private dayjsDateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
  ) { }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const token = uuidV4()
    const expires_date = this.dayjsDateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para a recuperação de senha é: ${token}`,
    )
  }
}

export { SendForgotPasswordMailUseCase }

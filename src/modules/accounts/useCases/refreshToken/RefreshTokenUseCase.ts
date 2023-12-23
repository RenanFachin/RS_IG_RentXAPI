import { sign, verify } from 'jsonwebtoken'
import { inject } from 'tsyringe'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import auth from '../../../../config/auth'
import { AppError } from '../../../../shared/errors/AppError'
import { IDateProvider } from '../../../../shared/container/providers/dateProvider/IDateProvider'

interface IPayload {
  sub: string // sub -> id do usuário
  email: string
}

class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUsersTokensRepository,
    @inject('DayJSDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) { }

  async execute(token: string) {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      )

    if (!userToken) {
      throw new AppError('Refresh Token doest not exists.')
    }

    // removendo o token existente
    await this.userTokensRepository.deleteById(userToken.id)

    const refresh_token = sign(
      {
        // payload
        email,
      },
      auth.secret_refresh_token,
      {
        subject: sub,
        expiresIn: auth.expires_in_refresh_token,
      },
    )

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      Number(auth.expires_refresh_token_days),
    )
    await this.userTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id,
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }

import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from '../../repositories/IUsersRepository'

import { AppError } from '../../../../shared/errors/AppError'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import auth from '../../../../config/auth'
import { IDateProvider } from '../../../../shared/container/providers/dateProvider/IDateProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJSDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verificar se usuário existe
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect')
    }

    // Verificar se senha é a correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    // Gerar token -> jsonWebToken
    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    })

    // Gerar refreshToken
    const refresh_token = sign(
      {
        // payload
        email,
      },
      auth.secret_refresh_token,
      {
        subject: user.id,
        expiresIn: auth.expires_in_refresh_token,
      },
    )

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      Number(auth.expires_refresh_token_days),
    )

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }

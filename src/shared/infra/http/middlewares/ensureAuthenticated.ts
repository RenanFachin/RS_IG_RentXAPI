import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import dotEnv from 'dotenv'
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '../../../errors/AppError'
import auth from '../../../../config/auth'

dotEnv.config()

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // Recebendo o token (Bearer Token -> header)
  const authHeader = request.headers.authorization

  // verificar se o authHeader está preenchido
  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  // Desestruturando o token existente
  // [Bearer] [cwMjQxMTkzMSwic3ViIjoiZmQ0NTFk]
  const [_bearer, token] = authHeader.split(' ')

  // Verificando se o token é válido
  // O método verify lança uma exceção caso dê erro, por isso devemos utilizar try catch
  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload

    // O retorno contido em decoded:
    /**
     * {
          iat: 1702326819,
          exp: 1702413219,
          sub: 'fd451d6f-e78d-4e9d-9e02-af963d0f99bc' -> id do usuário
        }
     */

    request.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}

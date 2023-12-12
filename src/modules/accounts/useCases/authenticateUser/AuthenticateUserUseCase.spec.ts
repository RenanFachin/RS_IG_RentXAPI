import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
describe('Authenticate User', () => {
  beforeEach(() => {
    // Instânciando o repository e os useCases
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '12345',
      name: 'User Test',
    }

    // Criando o usuário
    await createUserUseCase.execute(user)

    // Autenticação -> Tem como retorno um token
    const authResult = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    // console.log(authResult)
    expect(authResult).toHaveProperty('token')
  })

  it('should not be possible to authenticate a non-existent user', () => {
    // Tentando logar um usuário não existente
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be possible to authenticate a user with an incorrect password', () => {
    expect(async () => {
      // Criando um usuário
      const user: ICreateUserDTO = {
        driver_license: '9999999',
        email: 'user@user.com',
        password: '12345',
        name: 'User Test - Auth Error',
      }

      await createUserUseCase.execute(user)

      // Autenticação - Passando uma senha incorreta
      const authResult = await authenticateUserUseCase.execute({
        email: user.email,
        password: '1321312312',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})

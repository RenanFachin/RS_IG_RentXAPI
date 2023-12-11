import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

interface IUsersRepository {
  // métodos
  create(data: ICreateUserDTO): Promise<void>
}

export { IUsersRepository }

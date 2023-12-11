// Interfaces de "contrato"
import { IUsersRepository } from '../IUsersRepository'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

import { Repository, getRepository } from 'typeorm'
import { User } from '../../entities/User'

// Implementando a nossa interface de contrato
class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<void> {
    // Criando um objeto com os dados
    const user = this.repository.create({
      name: data.name,
      username: data.username,
      password: data.password,
      email: data.email,
      driver_license: data.driver_license,
    })

    // salvando no db
    await this.repository.save(user)
  }
}

export { UsersRepository }

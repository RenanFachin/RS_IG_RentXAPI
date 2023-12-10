import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  // SOLID -> Princípio da responsabilidade única
  // Inicializando o service passando o repositóries como argumento e após, chamando o método e passando os dados necessários
  // eslint-disable-next-line no-useless-constructor
  constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    // Dados vindos do body da requisição
    const { name, description } = request.body

    await this.createCategoryUseCase.execute({ name, description })

    return response.status(201).send()
  }
}

export { CreateCategoryController }

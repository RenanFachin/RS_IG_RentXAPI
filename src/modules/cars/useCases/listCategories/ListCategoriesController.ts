import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

class ListCategoriesController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const registeredCategories = this.listCategoriesUseCase.execute()

    return response.json(registeredCategories)
  }
}

export { ListCategoriesController }

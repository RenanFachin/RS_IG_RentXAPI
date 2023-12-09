import { Request, Response } from 'express'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

class ImportCategoryController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { file } = request

    if (!file) {
      return response.json({
        error: 'File is required!',
      })
    }

    this.importCategoryUseCase.execute(file)

    return response.send()
  }
}

export { ImportCategoryController }

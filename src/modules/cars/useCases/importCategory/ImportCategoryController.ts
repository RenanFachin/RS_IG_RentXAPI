import { Request, Response } from 'express'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'
import { container } from 'tsyringe'

class ImportCategoryController {
  handle(request: Request, response: Response): Response {
    const { file } = request

    if (!file) {
      return response.json({
        error: 'File is required!',
      })
    }

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
    importCategoryUseCase.execute(file)

    return response.send()
  }
}

export { ImportCategoryController }

import { Request, Response } from 'express'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'
import { container } from 'tsyringe'

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request

    if (!file) {
      return response.json({
        error: 'File is required!',
      })
    }

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
    await importCategoryUseCase.execute(file)

    return response.send()
  }
}

export { ImportCategoryController }

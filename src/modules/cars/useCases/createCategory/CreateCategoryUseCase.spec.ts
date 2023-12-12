import { AppError } from '../../../../shared/errors/AppError'
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
describe('Create Category', () => {
  beforeEach(() => {
    // Instanciar as variáveis
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'CategoryTeste',
      description: 'CategoryDescriptionTest',
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    // Verificando se existe uma categoria com o nome passado no repository in memory
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    )

    // console.log(categoryCreated)
    expect(categoryCreated).toHaveProperty('id')
  })

  it('should not be able to create a new category with an existing name', async () => {
    expect(async () => {
      const category = {
        name: 'CategoryTeste',
        description: 'CategoryDescriptionTest',
      }

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})

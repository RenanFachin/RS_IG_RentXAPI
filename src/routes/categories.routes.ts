import { Router } from 'express'

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { createCategoryController } from '../modules/cars/useCases/createCategory'

// Criando a rota
const categoriesRoutes = Router()
// Instânciando o repository da de categoria
const categoriesRepository = new CategoriesRepository()

// Criação de uma nova categoria
categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

// Listagem de todas categorias cadastradas
categoriesRoutes.get('/', (request, response) => {
  // Chamando o método e armazenando em uma constante
  const registeredCategories = categoriesRepository.list()

  return response.json(registeredCategories)
})

export { categoriesRoutes }

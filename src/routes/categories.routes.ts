import { Router } from 'express'

import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'

// Criando a rota
const categoriesRoutes = Router()

// Criação de uma nova categoria
categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

// Listagem de todas categorias cadastradas
categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response)
})

export { categoriesRoutes }

import { Router } from 'express'
import multer from 'multer'

import createCategoryController from '../modules/cars/useCases/createCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'
import { importCategoryController } from '../modules/cars/useCases/importCategory'

// Criando a rota
const categoriesRoutes = Router()

// Criação de uma nova categoria
categoriesRoutes.post('/', (request, response) => {
  return createCategoryController().handle(request, response)
})

// Listagem de todas categorias cadastradas
categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response)
})

const upload = multer({
  dest: './tmp',
})

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response)
})

export { categoriesRoutes }

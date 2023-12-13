import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

// Criando a rota
const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

// Criação de uma nova categoria
categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
)

// Listagem de todas categorias cadastradas
categoriesRoutes.get('/', listCategoriesController.handle)

const upload = multer({
  dest: './tmp',
})

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle,
)

export { categoriesRoutes }

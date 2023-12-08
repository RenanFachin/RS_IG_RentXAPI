import { Router } from 'express'

import { CategoriesRepository } from '../repositories/CategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

// Criando a rota
const categoriesRoutes = Router()
// Instânciando o repository da de categoria
const categoriesRepository = new CategoriesRepository()

// Criação de uma nova categoria
categoriesRoutes.post('/', (request, response) => {
  // Dados vindos do body da requisição
  const { name, description } = request.body

  // SOLID -> Princípio da responsabilidade única
  // Inicializando o service passando o repositóries como argumento e após, chamando o método e passando os dados necessários
  const createCategoryService = new CreateCategoryService(categoriesRepository)
  createCategoryService.execute({ name, description })

  return response.status(201).send()
})

// Listagem de todas categorias cadastradas
categoriesRoutes.get('/', (request, response) => {
  // Chamando o método e armazenando em uma constante
  const registeredCategories = categoriesRepository.list()

  return response.json(registeredCategories)
})

export { categoriesRoutes }

import { Router } from 'express'

import { CategoriesRepository } from '../repositories/CategoriesRepository'

// Criando a rota
const categoriesRoutes = Router()
// Instânciando o repository da de categoria
const categoriesRepository = new CategoriesRepository()

// Criação de uma nova categoria
categoriesRoutes.post('/', (request, response) => {
  // Dados vindos do body da requisição
  const { name, description } = request.body

  // Utilizando o repository, para que ele faça a conexão com o db e registre
  categoriesRepository.create({ name, description })

  return response.status(201).send()
})

// Listagem de todas categorias cadastradas
categoriesRoutes.get('/', (request, response) => {
  // Chamando o método e armazenando em uma constante
  const registeredCategories = categoriesRepository.list()

  return response.json(registeredCategories)
})

export { categoriesRoutes }

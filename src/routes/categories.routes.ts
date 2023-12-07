import { Router } from 'express'

import { CategoriesRepository } from '../repositories/CategoriesRepository'

// Criando a rota
const categoriesRoutes = Router()
// Instânciando o repository da de categoria
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  // Dados vindos do body da requisição
  const { name, description } = request.body

  // Utilizando o repository, para que ele faça a conexão com o db e registre
  categoriesRepository.create({ name, description })

  return response.status(201).send()
})

export { categoriesRoutes }

import { Router } from 'express'

import { Category } from '../model/Category'

const categoriesRoutes = Router()

// Definindo que categoryas deve serguir as tipagens do model Category, que é um array e que inicializa como vazio
const categories: Category[] = []

categoriesRoutes.post('/', (request, response) => {
  // Dados vindos do body da requisição
  const { name, description } = request.body

  // Instanciando a classe Category
  const category = new Category()
  Object.assign(category, {
    name,
    description,
    created_at: new Date(),
  })

  categories.push(category)

  return response.status(201).json({ category })
})

export { categoriesRoutes }

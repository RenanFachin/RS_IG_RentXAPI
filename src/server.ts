import 'reflect-metadata'

import express from 'express'
import 'express-async-errors'
import { router } from './routes'

import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

import './database'
import './shared/container'
import { AppError } from './errors/AppError'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Rotas
app.use(router)

// Trativa de erros
app.use((err: Error, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }

  // sendo um erro de outra origem, sem ser um AppError
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  })
})

app.listen(3333, () => {
  console.log('Server is running!')
})

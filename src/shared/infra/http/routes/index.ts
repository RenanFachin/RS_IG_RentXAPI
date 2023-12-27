import { Router } from 'express'
import { categoriesRoutes } from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { authRoutes } from './auth.routes'
import { carsRoutes } from './cars.routes'
import { rentalRoutes } from './rental.routes'
import { passwordRoutes } from './password.routes'

const router = Router()

// Rotas
router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/users', usersRoutes)
router.use(authRoutes)
router.use('/cars', carsRoutes)
router.use('/rentals', rentalRoutes)
router.use('/password', passwordRoutes)

export { router }

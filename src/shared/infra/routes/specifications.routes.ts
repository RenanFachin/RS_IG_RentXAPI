import { Router } from 'express'
import { CreateSpecificationController } from '../../../modules/cars/useCases/CreateSpecification/CreateSpecificationController'
import { ensureAuthenticated } from '../http/middlewares/ensureAuthenticated'

const specificationsRoutes = Router()

// Middleware de auth para todas rotas de specifications
specificationsRoutes.use(ensureAuthenticated)

const createSpecificationController = new CreateSpecificationController()
specificationsRoutes.post('/', createSpecificationController.handle)

export { specificationsRoutes }

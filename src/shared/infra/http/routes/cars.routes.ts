import { Router } from 'express'
import { CreateCarController } from '../../../../modules/cars/useCases/CreateCar/CreateCarController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ListCarsAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/listCarsAvailableCarsController'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableController = new ListCarsAvailableCarsController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)

carsRoutes.get('/available', listAvailableController.handle)

export { carsRoutes }

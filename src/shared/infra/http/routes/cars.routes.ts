import { Router } from 'express'
import { CreateCarController } from '../../../../modules/cars/useCases/CreateCar/CreateCarController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ListCarsAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListCarsAvailableCarsController'
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { UploadCarImagesController } from '../../../../modules/cars/useCases/uploadImage/UploadCarImagesController'
import uploadConfig from '../../../../config/upload'
import multer from 'multer'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableController = new ListCarsAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)

carsRoutes.get('/available', listAvailableController.handle)

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
)

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
)

export { carsRoutes }

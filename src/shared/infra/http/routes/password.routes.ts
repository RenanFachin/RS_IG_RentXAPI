import { Router } from 'express'
import { SendForgotPasswordMailControlller } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'

const passwordRoutes = Router()

const sendForgotPasswordMailUseCase = new SendForgotPasswordMailControlller()

passwordRoutes.post('/forgot', sendForgotPasswordMailUseCase.handle)

export { passwordRoutes }

import { Router } from 'express'
import { SendForgotPasswordMailControlller } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'
import { ResetPasswordUserController } from '../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController'

const passwordRoutes = Router()

const sendForgotPasswordMailControlller = new SendForgotPasswordMailControlller()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post('/forgot', sendForgotPasswordMailControlller.handle)
passwordRoutes.post('/reset', resetPasswordUserController.handle)

export { passwordRoutes }

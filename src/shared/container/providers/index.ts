import { container } from 'tsyringe'
import { IDateProvider } from './dateProvider/IDateProvider'
import { DayJSDateProvider } from './dateProvider/implementations/DayJSDateProvider'
import { IMailProvider } from './mailProvider/IMailProvider'
import { EtherealMailProvider } from './mailProvider/implementations/EtherealMailProvider'

container.registerSingleton<IDateProvider>(
  'DayJSDateProvider',
  DayJSDateProvider,
)

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
)

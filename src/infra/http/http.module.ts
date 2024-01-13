import { Module } from '@nestjs/common'
import { HttpModule as AxiosHttpModule } from '@nestjs/axios'

import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment.use-case'
import { CreateUserUseCase } from '@/domain/application/use-cases/create-user.use-case'
import { ExecuteSellUseCase } from '@/domain/application/use-cases/execute-sell.use-case'
import { ReadNumericLineUseCase } from '@/domain/application/use-cases/read-numeric-line.use-case'
import { ShowAddressByZipCodeUseCase } from '@/domain/application/use-cases/show-address-by-zipcode.use-case'
import { ShowEstablishmentUseCase } from '@/domain/application/use-cases/show-establishment.use-case'
import { ShowUserUseCase } from '@/domain/application/use-cases/show-user.use-case'
import { ShowZipCodeByAddressUseCase } from '@/domain/application/use-cases/show-zipcode-by-address.use-case'

import { DatabaseModule } from '@/infra/database/database.module'

import { CreateEstablishmentController } from '@/infra/http/controllers/create-establishment.controller'
import { CreateUserController } from '@/infra/http/controllers/create-user.controller'
import { ExecuteSellController } from '@/infra/http/controllers/execute-sell.controller'
import { ReadNumericLineController } from '@/infra/http/controllers/read-numeric-line.controller'
import { ShowAddressByZipCodeController } from '@/infra/http/controllers/show-address-by-zip-code.controller'
import { ShowEstablishmentController } from '@/infra/http/controllers/show-establishment.controller'
import { ShowUserController } from '@/infra/http/controllers/show-user.controller'
import { ShowZipCodeByAddressController } from '@/infra/http/controllers/show-zip-code-by-address.controller'

@Module({
  imports: [DatabaseModule, AxiosHttpModule],
  controllers: [
    CreateEstablishmentController,
    CreateUserController,
    ReadNumericLineController,
    ShowAddressByZipCodeController,
    ShowEstablishmentController,
    ShowUserController,
    ShowZipCodeByAddressController,
    ExecuteSellController,
  ],
  providers: [
    CreateEstablishmentUseCase,
    CreateUserUseCase,
    ExecuteSellUseCase,
    ReadNumericLineUseCase,
    ShowAddressByZipCodeUseCase,
    ShowEstablishmentUseCase,
    ShowUserUseCase,
    ShowZipCodeByAddressUseCase,
  ],
})
export class HttpModule {}

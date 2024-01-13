import { Module } from '@nestjs/common'

import { UsersRepository } from '@/domain/application/repositories/users.repository'
import { EstablishmentsRepository } from '@/domain/application/repositories/establishments.repository'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-user.repository'
import { PrismaEstablishmentsRepository } from '@/infra/database/prisma/repositories/prisma-establishment.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: EstablishmentsRepository,
      useClass: PrismaEstablishmentsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, EstablishmentsRepository],
})
export class DatabaseModule {}

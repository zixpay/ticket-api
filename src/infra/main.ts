import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { Env } from '@/infra/env'
import { AppModule } from '@/infra/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    cors: true,
  })

  const configService: ConfigService<Env, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()

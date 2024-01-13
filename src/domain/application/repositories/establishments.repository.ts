import { Establishment } from '@/domain/enterprise/entities/establishment'

interface PageUrlOutput {
  fineValue: number
  dailyArrears: number
  token: string
}

export abstract class EstablishmentsRepository {
  abstract findByid(id: string): Promise<Establishment | null>
  abstract findByToken(token: string): Promise<string | null>
  abstract findByPageUrl(pageUrl: string): Promise<PageUrlOutput | null>
  abstract create(establishment: Establishment): Promise<Establishment>
}

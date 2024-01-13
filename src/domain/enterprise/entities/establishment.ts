import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Address } from '@/domain/enterprise/entities/address'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'

interface Props {
  token: string
  establishment: string
  name: string
  fantasyName: string
  document: string
  sellerId: string
  fineValue: number
  dailyArrears: number
  pageUrl?: string
  email?: string | null
  logoUrl?: string | null
  phone?: string | null
  address: Address
  createdAt?: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class Establishment extends Entity<Props> {
  get token(): string {
    return this.props.token
  }

  set token(token: string) {
    this.props.token = token
  }

  get establishment(): string {
    return this.props.establishment
  }

  set establishment(establishment: string) {
    this.props.establishment = establishment
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get fantasyName(): string {
    return this.props.fantasyName
  }

  set fantasyName(fantasyName: string) {
    this.props.fantasyName = fantasyName
  }

  get document(): string {
    return this.props.document
  }

  set document(document: string) {
    this.props.document = document
  }

  get sellerId(): string {
    return this.props.sellerId
  }

  set sellerId(sellerId: string) {
    this.props.sellerId = sellerId
  }

  get fineValue(): number {
    return this.props.fineValue
  }

  set fineValue(fineValue: number) {
    this.props.fineValue = fineValue
  }

  get dailyArrears(): number {
    return this.props.dailyArrears
  }

  set dailyArrears(dailyArrears: number) {
    this.props.dailyArrears = dailyArrears
  }

  get pageUrl(): string | undefined {
    return this.props.pageUrl
  }

  set pageUrl(pageUrl: string | undefined) {
    this.props.pageUrl = pageUrl
  }

  get email(): string | undefined | null {
    return this.props.email
  }

  set email(email: string | undefined) {
    this.props.email = email
  }

  get logoUrl(): string | undefined | null {
    return this.props.logoUrl
  }

  set logoUrl(logoUrl: string | undefined) {
    this.props.logoUrl = logoUrl
  }

  get phone(): string | undefined | null {
    return this.props.phone
  }

  set phone(phone: string | undefined) {
    this.props.phone = phone
  }

  get address() {
    return this.props.address
  }

  set address(address: Address) {
    this.props.address = address
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<Props, 'createdAt'>, id?: UniqueEntityID) {
    const establishment = new Establishment(
      {
        ...props,
        pageUrl: props.pageUrl ?? Slug.createFromText(props.fantasyName).value,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return establishment
  }
}

import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface Props {
  userId?: UniqueEntityID | null
  establishmentId?: UniqueEntityID | null
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement?: string
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class Address extends Entity<Props> {
  get userId(): UniqueEntityID | undefined | null {
    return this.props.userId
  }

  set userId(userId: UniqueEntityID | undefined) {
    this.props.userId = userId
  }

  get establishmentId(): UniqueEntityID | undefined | null {
    return this.props.establishmentId
  }

  set establishmentId(establishmentId: string) {
    this.props.establishmentId = new UniqueEntityID(establishmentId)
  }

  get zipCode() {
    return this.props.zipCode
  }

  set zipCode(zipCode: string) {
    this.props.zipCode = zipCode
  }

  get state() {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
  }

  get street() {
    return this.props.street
  }

  set street(street: string) {
    this.props.street = street
  }

  get number() {
    return this.props.number
  }

  set number(number: string) {
    this.props.number = number
  }

  get complement(): string | undefined {
    return this.props.complement
  }

  set complement(complement: string) {
    this.props.complement = complement
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<Props, 'createdAt'>, id?: UniqueEntityID) {
    const address = new Address(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return address
  }
}

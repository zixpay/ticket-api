import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface Props {
  userId: UniqueEntityID
  cardLastFourDigits: string
  cardOwner: string
  expiry: string
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class Card extends Entity<Props> {
  get userId(): UniqueEntityID {
    return this.props.userId
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId
  }

  get cardLastFourDigits() {
    return this.props.cardLastFourDigits
  }

  set cardLastFourDigits(cardLastFourDigits: string) {
    this.props.cardLastFourDigits = cardLastFourDigits
  }

  get cardOwner() {
    return this.props.cardOwner
  }

  set cardOwner(cardOwner: string) {
    this.props.cardOwner = cardOwner
  }

  get expiry() {
    return this.props.expiry
  }

  set expiry(expiry: string) {
    this.props.expiry = expiry
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
    const card = new Card(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return card
  }
}

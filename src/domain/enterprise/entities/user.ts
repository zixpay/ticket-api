import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Address } from '@/domain/enterprise/entities/address'

export interface Props {
  document?: string
  email?: string
  name?: string
  phone?: string
  birthdate?: string
  recipientDocument?: string | null
  recipientEmail?: string | null
  recipientName?: string | null
  recipientPhone?: string | null
  recipientBirthdate?: string | null
  address: Address
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class User extends Entity<Props> {
  get document() {
    return this.props.document
  }

  set document(document: string | undefined) {
    this.props.document = document
  }

  get email() {
    return this.props.email
  }

  set email(email: string | undefined) {
    this.props.email = email
  }

  get name() {
    return this.props.name
  }

  set name(name: string | undefined) {
    this.props.name = name
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string | undefined) {
    this.props.phone = phone
  }

  get birthdate() {
    return this.props.birthdate
  }

  set birthdate(birthdate: string | undefined) {
    this.props.birthdate = birthdate
  }

  get recipientDocument(): string | undefined | null {
    return this.props.recipientDocument
  }

  set recipientDocument(recipientDocument: string | undefined) {
    this.props.recipientDocument = recipientDocument
  }

  get recipientEmail(): string | undefined | null {
    return this.props.recipientEmail
  }

  set recipientEmail(recipientEmail: string | undefined) {
    this.props.recipientEmail = recipientEmail
  }

  get recipientName(): string | undefined | null {
    return this.props.recipientName
  }

  set recipientName(recipientName: string | undefined) {
    this.props.recipientName = recipientName
  }

  get recipientPhone(): string | undefined | null {
    return this.props.recipientPhone
  }

  set recipientPhone(recipientPhone: string | undefined) {
    this.props.recipientPhone = recipientPhone
  }

  get recipientBirthdate(): string | undefined | null {
    return this.props.recipientBirthdate
  }

  set recipientBirthdate(recipientBirthdate: string | undefined) {
    this.props.recipientBirthdate = recipientBirthdate
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
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}

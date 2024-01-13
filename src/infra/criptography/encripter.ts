export abstract class Encrypter {
  abstract encrypt(payload: Record<string, never>): Promise<string>
}

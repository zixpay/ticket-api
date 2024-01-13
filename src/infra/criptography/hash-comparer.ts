export abstract class HashComparer {
  abstract compare(plain: string, digest: string): Promise<boolean>
}

export abstract class HashhGenerator {
  abstract hash(plain: string): Promise<string>
}

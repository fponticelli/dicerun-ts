export class LehmerSeed {
  private readonly m: number
  private readonly a: number
  public readonly seed: number

  constructor (seed: number, m: number = 2147483647, a: number = 48271) {
    this.m = m
    this.a = a
    this.seed = seed
  }

  public next (): LehmerSeed {
    const newSeed = (this.a * this.seed) % this.m
    return new LehmerSeed(newSeed, this.m, this.a)
  }

  public float (): number {
    return this.seed / this.m
  }
}

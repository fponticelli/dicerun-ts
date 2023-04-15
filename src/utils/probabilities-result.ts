export class ProbabilitiesResult {
  public map: Map<number, number>
  public count: number
  public constructor () {
    this.map = new Map()
    this.count = 0
  }

  public add (value: number): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (this.map.has(value)) { this.map.set(value, this.map.get(value)! + 1) } else { this.map.set(value, 1) }
    this.count++
  }

  public addQt (value: number, qt: number): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (this.map.has(value)) { this.map.set(value, this.map.get(value)! + qt) } else { this.map.set(value, qt) }
    this.count += qt
  }

  public toObject (): { count: number, values: Record<string, number> } {
    const o = {}
    for (const key of this.map.keys()) { Reflect.set(o, key, this.map.get(key)) }
    return {
      count: this.count,
      values: o
    }
  }

  public static fromObject (o: Record<string, any>): ProbabilitiesResult {
    const p = new ProbabilitiesResult()
    p.count = Reflect.get(o, 'count')
    const ob = Reflect.get(o, 'values')
    const fields = Reflect.ownKeys(ob) as string[]
    for (const f of fields) {
      p.map.set(parseInt(f), Reflect.get(ob, f))
    }
    return p
  }

  public bucket (bucketSize: number): ProbabilitiesResult {
    const pr = new ProbabilitiesResult()
    for (const k of this.map.keys()) {
      const nk = Math.ceil(k / bucketSize)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pr.addQt(nk, this.map.get(k)!)
    }
    return pr
  }

  public stats (): ProbabilitiesStats {
    return new ProbabilitiesStats(this.map, this.count)
  }
}

class ProbabilitiesStats {
  public minValue: number = 0
  public maxValue: number = 0
  public minWeight: number = 0
  public maxWeight: number = 0
  public total: number = 0
  public count: number = 0

  table: Map<number, number>
  public constructor (table: Map<number, number>, count: number) {
    this.table = table
    this.count = count
    if (count === 0) return
    const samples = Array.from(table.keys())
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const first = samples.shift()!
    this.maxValue = first
    this.minValue = first
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.total = table.get(first)!
    this.minWeight = this.total
    this.maxWeight = this.total
    for (const value of samples) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const weight = table.get(value)!
      if (value < this.minValue) this.minValue = value
      if (value > this.maxValue) this.maxValue = value
      if (weight < this.minWeight) this.minWeight = weight
      if (weight > this.maxWeight) this.maxWeight = weight
      this.total += weight
    }
  }

  public map<T>(f: (sample: Sample) => T): T[] {
    let accWeight = 0
    let revWeight = this.total
    const sample = new Sample(0, 0, accWeight, revWeight, this.minValue, this.maxValue, this.minWeight, this.maxWeight, this.total)
    const buf = []
    for (let i = this.minValue; i < this.maxValue + 1; i++) {
      sample.value = i
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sample.weight = this.table.has(i) ? this.table.get(i)! : 0
      accWeight += sample.weight
      sample.accWeight = accWeight
      sample.revWeight = revWeight
      revWeight -= sample.weight
      buf.push(f(sample))
    }
    return buf
  }
}

export class Sample {
  public value: number
  public weight: number
  public accWeight: number
  public revWeight: number
  public minValue: number
  public maxValue: number
  public minWeight: number
  public maxWeight: number
  public total: number

  public constructor (value: number, weight: number, accWeight: number, revWeight: number, minValue: number, maxValue: number, minWeight: number, maxWeight: number, total: number) {
    this.value = value
    this.weight = weight
    this.accWeight = accWeight
    this.revWeight = revWeight
    this.minValue = minValue
    this.maxValue = maxValue
    this.minWeight = minWeight
    this.maxWeight = maxWeight
    this.total = total
  }

  getPercent (): number {
    return this.weight / this.total
  }

  getMaxPercent (): number {
    return this.getPercent() / (this.maxWeight / this.total)
  }

  getAccPercent (): number {
    return this.accWeight / this.total
  }

  getRevPercent (): number {
    return this.revWeight / this.total
  }
}

import { Prop } from '@tempots/dom'

interface Store {
  get: () => string
  set: (value: string) => void
  has: () => boolean
}

class LocalStorageStore implements Store {
  constructor (private readonly key: string) {}
  has (): boolean { return localStorage.getItem(this.key) !== null }
  get (): string { return localStorage.getItem(this.key) ?? '' }
  set (value: string): void {
    localStorage.setItem(this.key, value)
  }
}

export function storedProp<T> (
  store: Store,
  makeDefault: () => T,
  serialize: (value: T) => string = JSON.stringify,
  deserialize: (value: string) => T = JSON.parse
): Prop<T> {
  const prop = Prop.of(store.has() ? deserialize(store.get()) : makeDefault())
  prop.subscribe(value => {
    const serialized = serialize(value)
    // only store if smaller than ~500kb
    if (serialized.length < 500000) {
      store.set(serialized)
    }
  })
  return prop
}

export function localStorageProp<T> (
  key: string,
  makeDefault: () => T,
  serialize: (value: T) => string = JSON.stringify,
  deserialize: (value: string) => T = JSON.parse
): Prop<T> {
  const store = new LocalStorageStore(key)
  return storedProp(store, makeDefault, serialize, deserialize)
}

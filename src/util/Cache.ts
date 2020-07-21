import NodeCache from 'node-cache'
import { Service } from 'typedi'

@Service()
export class Cache {
  private cache: NodeCache

  constructor (readonly ttlSeconds: number, readonly checkPeriod: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: checkPeriod,
      useClones: false
    })
  }

  get<T> (key: string, storeFunction: Function): Promise<T> {
    const value = this.cache.get<T>(key)
    if (value) {
      return Promise.resolve(value)
    }

    return storeFunction().then((result: Promise<T>) => {
      this.cache.set(key, result)
      return result
    })
  }

  flush () {
    this.cache.flushAll()
  }

}

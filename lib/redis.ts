import { Redis } from '@upstash/redis'

export const redis = Redis.fromEnv()

export const KEYS = {
  products: 'quencha:products',
  settings: 'quencha:settings',
}

/**
 * DexieDB Data access object
 */
import { DBSchema } from "./types"

export interface IDao<T> {
  dbRef: DBSchema

  add: (t: T) => void

  bulkAdd?: (keys: string[]) => void

  edit: (id: string, t: T) => void

  delete: (id: string) => void

  bulkDelete?: (keys: string[]) => void

  get: (id: string) => Promise<T>

  getList: () => T[]
}

/**
 * Dexie Dao for each IndexDB table
 */
export abstract class DexieDao<T> implements IDao<T> {
  dbRef: DBSchema

  constructor(dbRef: DBSchema) {
    this.dbRef = dbRef
  }

  abstract add(t: T): void

  abstract edit(id: string, t: T): void

  abstract delete(id: string): void

  abstract get(id: string): Promise<T>

  abstract getList(): T[]
}

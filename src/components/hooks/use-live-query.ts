import { Table } from "dexie"
import { useLiveQuery } from "dexie-react-hooks"

export default <D, T>(table: Table, queryCallback: () => any, deps: D) =>
  useLiveQuery(() => {
    if (table) {
      return queryCallback()
    }
    return undefined as unknown as T
    // @ts-ignore
  }, [...deps])

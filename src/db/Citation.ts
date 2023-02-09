import { DexieDao } from "./IDao"
import { TCitation } from "./types"
import useLiveQuery from "../components/hooks/use-live-query"
import { DocumentType } from "../types"

export class CitationDao extends DexieDao<TCitation> {
  add(citation: TCitation): void {
    this.dbRef.citation.add(citation)
  }

  bulkAdd(citations: TCitation[]): void {
    this.dbRef.citation.bulkAdd(citations)
  }

  delete(id: string): void {
    this.dbRef.citation.delete(id)
  }

  edit(id: string, citation: TCitation): void {
    this.dbRef.citation.update(id, citation)
  }

  async get(id: string): Promise<TCitation> {
    return (await this.dbRef.citation.where("id").equals(id).toArray())[0]
  }

  // TODO:: use pagination
  getList(): TCitation[] {
    return (
      useLiveQuery(this.dbRef.citation, () => this.dbRef.citation.toArray(), []) ||
      []
    )
  }

  getFilteredList(filters: DocumentType[]): TCitation[] {
    return (
      useLiveQuery(
        this.dbRef.citation,
        () => this.dbRef.citation.where(filters).equals("type").toArray(),
        [filters],
      ) || []
    )
  }
}

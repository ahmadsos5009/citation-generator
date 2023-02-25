import { DexieDao } from "./IDao"
import { DBSchema, TCitation, TProject } from "./types"
import useLiveQuery from "../components/hooks/use-live-query"
import { DocumentType } from "../types"

type TableQueryOptions = {
  group: string
  page: number
  pageSize: number
}

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

  async bulkDelete(ids: string[]): Promise<void> {
    await this.dbRef.citation.bulkDelete(ids)
  }

  edit(id: string, citation: TCitation): void {
    this.dbRef.citation.update(id, citation)
  }

  async get(id: string): Promise<TCitation> {
    return (await this.dbRef.citation.where("id").equals(id).toArray())[0]
  }

  async bulkGet(ids: string[]): Promise<TCitation[]> {
    return ((await this.dbRef.citation.bulkGet(ids)) || []) as TCitation[]
  }

  getList(): TCitation[] {
    return (
      useLiveQuery(this.dbRef.citation, () => this.dbRef.citation.toArray(), []) ||
      []
    )
  }

  getCitationsCount(group: string): number {
    return useLiveQuery(
      this.dbRef.citation,
      () => {
        if (group === "all") {
          return this.dbRef.citation.count()
        }
        if (group === "favorites") {
          return this.dbRef.citation.where("favorite").equals(1).count()
        }
        return this.dbRef.project
          .get({ id: group })
          .then((project) => (project && project.citations.length) || 0)
      },
      [group],
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

  getCitations(options: TableQueryOptions): TProject[] {
    return (
      useLiveQuery(
        this.dbRef.citation,
        () => {
          const { group, page, pageSize } = options

          if (group === "all") {
            return this.dbRef.citation
              .offset(page * pageSize)
              .limit(pageSize)
              .toArray()
          }

          if (group === "favorites") {
            return CitationDao.getFavoriteReferences(this.dbRef, options)
          }

          return CitationDao.getUserProjectCitation(this.dbRef, options)
        },
        [...Object.values(options)],
      ) || []
    )
  }

  /**
   * Return Favorite References, from citation table
   */
  static getFavoriteReferences(dbRef: DBSchema, options: TableQueryOptions) {
    const { page, pageSize } = options

    return dbRef.citation
      .where("favorite")
      .equals(1)
      .offset(page * pageSize)
      .limit(pageSize)
      .toArray()
  }

  /**
   * Return Citations in the user project, and clean it from project if not exists
   */
  static getUserProjectCitation(dbRef: DBSchema, options: TableQueryOptions) {
    const { group } = options
    return dbRef.project.get(group).then((project) => {
      return (
        (project && dbRef.citation.bulkGet(project.citations))?.then((citations) => {
          const cleanCitation = citations.filter(
            (citation) => !!citation,
          ) as TCitation[]

          if (cleanCitation.length !== project.citations.length) {
            dbRef.project.update(project.id, {
              citations: cleanCitation.map(({ id }) => id),
            })
          }

          return cleanCitation
        }) || []
      )
    })
  }
}

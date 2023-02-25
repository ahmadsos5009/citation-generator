import { DexieDao } from "./IDao"
import { TProject } from "./types"
import useLiveQuery from "../components/hooks/use-live-query"

export class ProjectDao extends DexieDao<TProject> {
  async add(project: TProject): Promise<void> {
    await this.dbRef.project.add(project)
  }

  delete(id: string): void {
    this.dbRef.project.delete(id)
  }

  edit(id: string, project: TProject): void {
    this.dbRef.project.update(id, project)
  }

  async get(id: string): Promise<TProject> {
    return (await this.dbRef.project.where("id").equals(id).toArray())[0]
  }

  getList(): TProject[] {
    return (
      useLiveQuery(this.dbRef.project, () => this.dbRef.project.toArray(), []) || []
    )
  }

  /**
   * Exclude selected project from the projects list
   */
  getProjects(projectId: string): TProject[] {
    return (
      useLiveQuery(
        this.dbRef.project,
        () => this.dbRef.project.where("id").notEqual(projectId).toArray(),
        [],
      ) || []
    )
  }
}

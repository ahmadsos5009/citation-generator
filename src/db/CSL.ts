import { DexieDao } from "./IDao"
import { TCSL } from "./types"
import config from "../config"
import { v4 as uuid } from "uuid"

export class CSLDao extends DexieDao<TCSL> {
  async get(name: string): Promise<TCSL> {
    const csl = await this.dbRef.csl.where("name").equals(name).toArray()
    if (!csl.length) {
      /** Get Mdx body of the CSL XML **/
      const data = await CSLDao.fetchCSL(name)
      this.add(data)
      return data
    } else return csl[0]
  }

  add(csl: TCSL): void {
    this.dbRef.csl.add(csl)
  }

  delete(id: string): void {
    this.dbRef.csl.delete(id)
  }

  edit(): void {}

  getList(): TCSL[] {
    return []
  }

  static async fetchCSL(name: string): Promise<TCSL> {
    const data = await (
      await fetch(`${config.DOMAIN}/page-data/${name}/page-data.json`)
    ).json()
    const xml = data.result.pageContext.xml as string
    return { id: uuid(), name, xml }
  }
}

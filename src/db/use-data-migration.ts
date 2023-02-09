import { useEffect } from "react"
import { CSL_METADATA } from "../csl_metadata"

export default () => {
  useEffect(() => {
    Object.values(CSL_METADATA).map(({ id }) => {
      const data = localStorage.getItem(id)
      if (data) {
        const citation = JSON.parse(data)
      }
    })
  }, [])
}

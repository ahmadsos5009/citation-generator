import { Cite } from "@citation-js/core"
import { Citation, DocumentType } from "../../types"
import HTMLtoDOCX from "html-to-docx"
import { saveAs } from "file-saver"
import juice from "juice"
require("@citation-js/plugin-csl")
require("@citation-js/plugin-bibtex")

// TODO:: ADD CSL Style and Editor Style
const CSL_CSS = `<style></style>`

export const export_word = async (citationHtml: string, fileName: string) => {
  /**
   * As there is no representation for the div in openXML will replace it with span
   * and Add break between citations as there is no support for marginBottom
   */
  const getHtml = () => {
    const parser = new DOMParser()
    const document = parser.parseFromString(citationHtml, "text/html")
    Array.from(
      document.body.querySelectorAll("div .csl-right-inline,div .csl-left-margin"),
    ).map((div) => {
      const wrapper = document.createElement("span")
      wrapper.innerHTML = div.innerHTML
      wrapper.className = div.className
      div.replaceWith(wrapper)
    })

    Array.from(document.body.querySelectorAll("div .csl-entry")).map((div) => {
      div.appendChild(document.createElement("br"))

      if (!div.querySelector("div .csl-right-inline,div .csl-left-margin")) {
        const wrapper = document.createElement("span")
        wrapper.innerHTML = div.innerHTML
        wrapper.className = div.className
        div.replaceWith(wrapper)
      }
    })
    return document.body.outerHTML
  }

  const source = `<!DOCTYPE html><html lang="en">${getHtml()}</html>`

  const fileBuffer = await HTMLtoDOCX(juice.inlineContent(source, CSL_CSS), null, {
    orientation: "portrait",
  })

  saveAs(fileBuffer, `${fileName}.docx`)
}

export const export_pdf = async (citationHtml: string, fileName: string) => {
  const pdfMake = await import(
    /* webpackChunkName: "pdfmake" */ "pdfmake/build/pdfmake"
  )
  const pdfFonts = await import(
    /* webpackChunkName: "vfs_fonts" */ "pdfmake/build/vfs_fonts"
  )
  pdfMake.vfs = pdfFonts.pdfMake.vfs
  const htmlToPdfmake = await import(
    /* webpackChunkName: "html-to-pdfmake" */ "html-to-pdfmake"
  )

  const pdfData = htmlToPdfmake.default(citationHtml)
  pdfMake
    // @ts-ignore
    .createPdf(
      {
        content: pdfData,
        styles: {
          "csl-bib-body": {
            lineHeight: 1.8,
            // font: '"SangBleu Republic", "Times New Roman", serif',
            fontSize: 12,
          },
          "csl-left-margin": {
            alignment: "left",
          },
          "csl-right-inline": {
            margin: [0, 0, 0, 16],
          },
        },
      },
      undefined,
      undefined,
      pdfFonts.pdfMake.vfs,
    )
    .download(fileName)
}

export const export_bibTex = (
  citations: Citation & { type: DocumentType }[],
  fileName: string,
): void => {
  const cite = Cite(citations, { format: "string" })

  const bibTex = cite.format("bibtex", {
    format: "text",
    template: "apa",
    lang: "en-US",
  })

  const link = document.createElement("a")

  link.href = `data:text/x-tex;charset=UTF-8,` + encodeURIComponent(bibTex)
  link.download = `${fileName}.bib`
  link.click()
}

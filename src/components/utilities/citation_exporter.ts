import { Cite } from "@citation-js/core"
import { Citation, DocumentType } from "../../types"
import HTMLtoDOCX from "html-to-docx"
import { saveAs } from "file-saver"
import juice from "juice"
require("@citation-js/plugin-csl")
require("@citation-js/plugin-bibtex")

const CSL_CSS = `<style>
/*
 * CKEditor 5 (v34.1.0) content styles.
 * Generated on Wed, 08 Jun 2022 05:12:27 GMT.
 * For more information, check out https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/content-styles.html
 */

/* ckeditor5-block-quote/theme/blockquote.css */
.ck-content blockquote {
    overflow: hidden;
    padding-right: 1.5em;
    padding-left: 1.5em;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    border-left: solid 5px #CCCCCCFF;
}
/* ckeditor5-block-quote/theme/blockquote.css */
.ck-content[dir="rtl"] blockquote {
    border-left: 0;
    border-right: solid 5px #CCCCCCFF;
}
/* ckeditor5-basic-styles/theme/code.css */
.ck-content code {
    background-color: #C7C7C74C;
    padding: .15em;
    border-radius: 2px;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-tiny {
    font-size: .7em;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-small {
    font-size: .85em;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-big {
    font-size: 1.4em;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-huge {
    font-size: 1.8em;
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-yellow {
    background-color: #fdfd77ff;
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-green {
    background: #62F962FF;
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-pink {
    background-color: #FC7899FF;
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-blue {
    background-color: #72CCFDFF;
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .pen-red {
    color: #E71313FF;
    background-color: transparent;
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .pen-green {
    color: #128A00FF;
    background-color: transparent;
}
/* ckeditor5-image/theme/imagecaption.css */
.ck-content .image > figcaption {
    display: table-caption;
    caption-side: bottom;
    word-break: break-word;
    color: #333333FF;
    background-color: #F7F7F7FF;
    padding: .6em;
    font-size: .75em;
    outline-offset: -1px;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image {
    display: table;
    clear: both;
    text-align: center;
    margin: 0.9em auto;
    min-width: 50px;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    min-width: 100%;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image-inline {
    /*
     * Normally, the .image-inline would have "display: inline-block" and "img { width: 100% }" (to follow the wrapper while resizing).;
     * Unfortunately, together with "srcset", it gets automatically stretched up to the width of the editing root.
     * This strange behavior does not happen with inline-flex.
     */
    display: inline-flex;
    max-width: 100%;
    align-items: flex-start;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image-inline picture {
    display: flex;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image-inline picture,
.ck-content .image-inline img {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 100%;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized {
    max-width: 100%;
    display: block;
    box-sizing: border-box;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized img {
    width: 100%;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized > figcaption {
    display: block;
}
/* ckeditor5-language/theme/language.css */
.ck-content span[lang] {
    font-style: italic;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list {
    list-style: none;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list li {
    margin-bottom: 5px;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list li .todo-list {
    margin-top: 5px;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input {
    -webkit-appearance: none;
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    border: 0;
    left: -25px;
    margin-right: -15px;
    right: 0;
    margin-left: 0;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input::before {
    display: block;
    position: absolute;
    box-sizing: border-box;
    content: '';
    width: 100%;
    height: 100%;
    border: 1px solid #333333FF;
    border-radius: 2px;
    transition: 250ms ease-in-out box-shadow, 250ms ease-in-out background, 250ms ease-in-out border;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input::after {
    display: block;
    position: absolute;
    box-sizing: content-box;
    pointer-events: none;
    content: '';
    left: calc( 16px / 3 );
    top: calc( 16px / 5.3 );
    width: calc( 16px / 5.3 );
    height: calc( 16px / 2.6 );
    border-style: solid;
    border-color: transparent;
    border-width: 0 calc( 16px / 8 ) calc( 16px / 8 ) 0;
    transform: rotate(45deg);
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input[checked]::before {
    background: #26AB33FF;
    border-color: #26AB33FF;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input[checked]::after {
    border-color: #FFFFFFFF;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label .todo-list__label__description {
    vertical-align: middle;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-block-align-left,
.ck-content .image-style-block-align-right {
    max-width: calc(100% - 1.5em);
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-left,
.ck-content .image-style-align-right {
    clear: none;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-side {
    float: right;
    margin-left: 1.5em;
    max-width: 50%;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-left {
    float: left;
    margin-right: 1.5em;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-center {
    margin-left: auto;
    margin-right: auto;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-right {
    float: right;
    margin-left: 1.5em;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-block-align-right {
    margin-right: 0;
    margin-left: auto;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-block-align-left {
    margin-left: 0;
    margin-right: auto;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content p + .image-style-align-left,
.ck-content p + .image-style-align-right,
.ck-content p + .image-style-side {
    margin-top: 0;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-inline.image-style-align-left,
.ck-content .image-inline.image-style-align-right {
    margin-top: calc(1.5em / 2);
    margin-bottom: calc(1.5em / 2);
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-inline.image-style-align-left {
    margin-right: calc(1.5em / 2);
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-inline.image-style-align-right {
    margin-left: calc(1.5em / 2);
}
/* ckeditor5-media-embed/theme/mediaembed.css */
.ck-content .media {
    clear: both;
    margin: 0.9em 0;
    display: block;
    min-width: 15em;
}
/* ckeditor5-page-break/theme/pagebreak.css */
.ck-content .page-break {
    position: relative;
    clear: both;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* ckeditor5-page-break/theme/pagebreak.css */
.ck-content .page-break::after {
    content: '';
    position: absolute;
    border-bottom: 2px dashed #C4C4C4FF;
    width: 100%;
}
/* ckeditor5-page-break/theme/pagebreak.css */
.ck-content .page-break__label {
    position: relative;
    z-index: 1;
    padding: .3em .6em;
    display: block;
    text-transform: uppercase;
    border: 1px solid #C4C4C4FF;
    border-radius: 2px;
    font-family: Helvetica, Arial, Tahoma, Verdana, Sans-Serif;
    font-size: 0.75em;
    font-weight: bold;
    color: #333333FF;
    background: #FFFFFFFF;
    box-shadow: 2px 2px 1px #00000026;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
/* ckeditor5-table/theme/tablecaption.css */
.ck-content .table > figcaption {
    display: table-caption;
    caption-side: top;
    word-break: break-word;
    text-align: center;
    color: #333333FF;
    background-color: #F7F7F7FF;
    padding: .6em;
    font-size: .75em;
    outline-offset: -1px;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table {
    margin: 0.9em auto;
    display: table;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    height: 100%;
    border: 1px double #B3B3B3FF;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table td,
.ck-content .table table th {
    min-width: 2em;
    padding: .4em;
    border: 1px solid #BFBFBFFF;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table th {
    font-weight: bold;
    background: #000000FF;
}
/* ckeditor5-table/theme/table.css */
.ck-content[dir="rtl"] .table th {
    text-align: right;
}
/* ckeditor5-table/theme/table.css */
.ck-content[dir="ltr"] .table th {
    text-align: left;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table table {
    overflow: hidden;
    table-layout: fixed;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table td,
.ck-content .table th {
    position: relative;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table .table-column-resizer {
    position: absolute;
    top: -999999px;
    bottom: -999999px;
    right: calc(7px * -0.5 - 0.5px);
    width: 7px;
    cursor: col-resize;
    user-select: none;
    z-index: 1;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table[draggable] .table-column-resizer {
    display: none;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content .table .table-column-resizer:hover,
.ck-content .table .table-column-resizer__active {
    background-color: #198CF0FF;
    opacity: 0.25;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content[dir=rtl] .table .table-column-resizer {
    left: calc(7px * -0.5 - 0.5px);
    right: unset;
}
/* ckeditor5-table/theme/tablecolumnresize.css */
.ck-content.ck-read-only .table .table-column-resizer {
    display: none;
}
/* ckeditor5-code-block/theme/codeblock.css */
.ck-content pre {
    padding: 1em;
    color: #353535FF;
    background: #C7C7C74C;
    border: 1px solid #C4C4C4FF;
    border-radius: 2px;
    text-align: left;
    direction: ltr;
    tab-size: 4;
    white-space: pre-wrap;
    font-style: normal;
    min-width: 200px;
}
/* ckeditor5-code-block/theme/codeblock.css */
.ck-content pre code {
    background: unset;
    padding: 0;
    border-radius: 0;
}
/* ckeditor5-horizontal-line/theme/horizontalline.css */
.ck-content hr {
    margin: 15px 0;
    height: 4px;
    background: #DEDEDEFF;
    border: 0;
}
/* ckeditor5-mention/theme/mention.css */
.ck-content .mention {
    background: #99003019;
    color: #990030FF;
}
@media print {
    /* ckeditor5-page-break/theme/pagebreak.css */
    .ck-content .page-break {
        padding: 0;
    }
    /* ckeditor5-page-break/theme/pagebreak.css */
    .ck-content .page-break::after {
        display: none;
    }
}
</style>`

export const export_word = async (citationHtml: string, fileName: string) => {
  /**
   * As there is no representation for the div in openXML will replace it with span
   * and Add break between citations as there is no support for marginBottom
   */
  const getHtml = () => {
    const parser = new DOMParser()
    const document = parser.parseFromString(citationHtml, "text/html")
    document.body.classList.add("ck-content")
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

  const parser = new DOMParser()
  const document = parser.parseFromString(citationHtml, "text/html")
  document.body.classList.add("ck-content")
  const source = `<!DOCTYPE html><html lang="en">${document.body.outerHTML}</html>`

  const pdfData = htmlToPdfmake.default(juice.inlineContent(source, CSL_CSS))
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

const FORMAT_EXTENSION = {
  bibtex: "bib",
  ris: "ris",
}

export const export_citations = (
  citations: Citation & { type: DocumentType }[],
  format: "bibtex" | "ris",
  fileName: string,
): void => {
  const cite = Cite(citations, { format: "string" })

  const bibTex = cite.format(format, {
    format: "text",
    template: "apa",
    lang: "en-US",
  })

  const link = document.createElement("a")

  link.href = `data:text/x-tex;charset=UTF-8,` + encodeURIComponent(bibTex)
  link.download = `${fileName}.${FORMAT_EXTENSION[format]}`
  link.click()
}

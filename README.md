<h1 align="center">
  Citation Generator
</h1>

#### Create Citation online rapidly 🚀, with support for a large number of citation styles, for Book, Journal articles.

#### 🧐 CSL styles supported

    ├── apa
    ├── apa 7 *
    ├── ama *
    ├── asa *
    ├── acm
    ├── acs
    ├── cse *
    ├── ieee
    ├── mla
    ├── mla_8th *
    ├── mhra *
    ├── turabian_9th
    ├── turabian_9th
    ├── chicago
    ├── harvard
    ├── nature
    ├── vancouver
    ├── oscola
    ├── nlm
    ├── ecology
    ├── rsc

#### Steps To Add a new CSL Style:

- Add mdx file [MDX](https://github.com/asouqi/citation-generator/blob/master/src/mdx)
- Get MetaDate from [CSL](https://csl.mendeley.com/)
- Add new style to the [CitationStyle](https://github.com/asouqi/citation-generator/blob/master/src/types.ts#L26) type
- Add [CSL MetaData](https://github.com/asouqi/citation-generator/blob/master/src/csl_metadata.ts), Object Attributes: `id, style_title, field, image` and `CSL_XML` remove [line break](https://lingojam.com/TexttoOneLine)

#### User Feedback will be stored in:

     https://jsonbin.io/app/bins

#### TODO::

- [x] Update home page
- [x] Add share buttons
- [x] Privacy Policy
- [x] Contact Us
- [x] Terms
- [x] update generator page
- [x] update list generator page
- [x] reuse reference list to be a reference manger page in future
  > Google Ads try
- [x] Fix Scrollbar
- [x] Performance fix for CSL xml
- [x] move all CSL to config
- [x] use IndexDB, and update schema, for Reference Management System
- [x] Add Guide Pages
- [x] Update Form
- [x] build Reference Management System
- [x] RMS & filter
- [x] RMS Add user projects
- [x] RMS Clean DB
- [ ] Add Google Docs, Microsoft Word, Bibitem, Endnote / https://schemas.liquid-technologies.com/officeopenxml/2006/?page=shared-bibliography_xsd.html
- [ ] Add Footnote preview / https://github.com/timlrx/rehype-citation
- [ ] Update Form `text fields` `authors` `link` `date`
- [ ] Add Guide external link and format to the generator page
  > Add Google Ads Unit
- [ ] build annotated bibliography page
- [ ] Fix Imported Data, and filter just document type
- [ ] Fix Import and upload list item
- [ ] Duplicate references citation.js
- [ ] PubMed
- [ ] add 4040 page
- [ ] add more CSL style

### Reference Management System

- [ ] Full document search
- [ ] ...

Dexie - Schema:

- csl: `id, name, xml`
- citation: `id, type, json, updatedTimestamp`
- collection: `id, name, references`

> -[X] Seed CSL on request 
> -[X] Add CSL XSLT to the body 
> - [X] Static example generation, like mdx page

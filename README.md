<h1 align="center">
  Citation Generator
</h1>

#### Create Citation online rapidly 🚀, with support for a large number of citation styles, for Book, Journal articles.

#### 🧐 CSL styles supported

    ├── apa
    ├── apa 7
    ├── ama
    ├── asa
    ├── acm
    ├── acs
    ├── cse
    ├── ieee
    ├── mla
    ├── mla_8th
    ├── mhra
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
- [ ] use IndexDB, and update schema, for Reference Management System
- [ ] build Reference Management System
- [ ] build annotated bibliography page
- [ ] add 4040 page
- [ ] add more CSL style

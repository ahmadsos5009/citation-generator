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
- [x] Add Google Docs, Microsoft Word, Bibitem, Endnote / https://schemas.liquid-technologies.com/officeopenxml/2006/?page=shared-bibliography_xsd.html
- [x] Update Form `text fields` `authors` `link` `date`
  > Add Google Ads Unit
- [ ] build annotated bibliography page
- [ ] clean imported data, to just like type, use `in` operation
- [ ] latex support, bibitem
- [ ] Fix Imported Data, and filter just document type
- [ ] Fix Import and upload list item
- [ ] Duplicate references citation.js
- [ ] PubMed
- [ ] add 4040 page
- [ ] add more CSL style
- [ ] Add Footnote preview / https://github.com/timlrx/rehype-citation
- [ ] Add format to the generator page

### Reference Management System

- [ ] Pull full text document, and show it as pdf
- [ ] Full text search
- [ ] Fix Mobile view
- [ ] ...

Dexie - Schema:

- csl: `id, name, xml`
- citation: `id, type, json, updatedTimestamp`
- collection: `id, name, references`

> -[X] Seed CSL on request 
> -[X] Add CSL XSLT to the body 
> -[X] Static example generation, like mdx page





## Open Xml:
            
`7.4.1 Types of Sources`
The Office Open XML formats support a collection of predefined source types for bibliography entries based on the categories most commonly used in various citation and bibliography style guidelines . The set of predefined source types can be extended as needed. The recommended approach for extending this set is to use the Misc type, and then leverage the methods described in Part 5 of this standard for extending the format with new attributes or elements. The  following types of sources are predefined:
- Book (Book)
- BookSection (Book Section)
- JournalArticle (Journal Article)
- MagOrNewsArticle (Magazine or Newspaper Article)
- ConferenceProceedings (Conference Proceedings)
- Report (Report)
- SoundRecording (Sound Recording)
- Performance (Performance)
- Art (Art)
- DocumentFromInternetSite (Document from Internet Site)
- InternetSite (Internet Site)
- Film (Film)
- Interview (Interview)
- Patent (Patent)
- ElectronicSource (Electronic Source)
- Case (Case)
- Misc (Miscellaneous)

`7.4.2 Child Elements`
Each Source element has a number of elements as children, each of which represents a different piece of data for the bibliography entries. For example, a book might have an author, title, publisher, year, and city. Most are self-explanatory, but this document will pay special attention to some of the more complex children.
The child elements are:
- AbbreviatedCaseNumber *
- AlbumTitle *
- Author
- BookTitle
- Broadcaster *
- BroadcastTitle *
- CaseNumber *
- ChapterNumber
- City *
- Comments *
- ConferenceName *
- Country *
- CountryRegion * 
- Court *
- Day
- DayAccessed
- Department *
- Distributor *
- Edition
- Guid *
- Institution *
- InternetSiteTitle *
- Issue
- JournalName
- LCID *
- Medium
- Month
- MonthAccessed
- NumberVolumes
- Pages
- PatentNumber *
- PeriodicalTitle
- PlacePublished
- ProductionCompany *
- PublicationTitle
- Publisher
- RecordingNumber *
- RefOrder *
- Reporter *
- SourceType
- ShortTitle
- StandardNumber - ISSN, ISBN
- StateProvince *
- Station *
- Tag * 
- Theater *
- ThesisType *
- Title
- Type
- URL
- Version
- Volume
- Year
- YearAccessed

`7.4.3 Author`
There are two elements with the same name: Author. The first Author element is a container for the set of contributors attributed to the current source. The second Author element is a child of the first  and is used to represent a single contributor. The valid set of contributors is defined as:
- Artist
- Author
- BookAuthor
- Compiler
- Composer
- Conductor *
- Counsel *
- Director
- Editor
- Interviewee *
- Interviewer
- Inventor *
- Performer
- ProducerName
- Translator
- Writer *

-----------------------------------------

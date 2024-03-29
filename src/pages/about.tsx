import * as React from "react"

import Seo from "../components/Seo"
import Layout from "../components/pages/Layout"
import { Grid } from "@mui/material"
import { PrimaryTextStart } from "../components/Typography"

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Seo title="About" path="about" />
      <Grid
        p={2}
        bgcolor="primary.main"
        container
        justifyContent="center"
        height="100%"
      >
        <Grid md={4} item>
          <PrimaryTextStart>
            Welcome to Citation Generator Website, the free online citation and
            bibliography generator. Our mission is to make it easy for students,
            researchers, and professionals to accurately and quickly generate
            citations and bibliographies for their work.
          </PrimaryTextStart>
          <PrimaryTextStart>
            Our citation generator website is user-friendly and intuitive, with a
            simple and straightforward design that makes it easy to generate and
            store citations in your browser. Whether you&apos;re writing a research
            paper, a thesis, or just need to create a bibliography, our citation
            generator has got you covered.
          </PrimaryTextStart>
          <PrimaryTextStart>
            Our citation generator is constantly updated to reflect the latest
            citation styles, including APA, MLA, Chicago, and more. We make it simple
            to switch between citation styles, so you can easily format your work to
            meet the requirements of any assignment or publication.
          </PrimaryTextStart>
          <PrimaryTextStart>
            In addition to generating citations, our citation generator also helps
            you create a complete reference list or bibliography for your work. With
            just a few clicks, you can generate a complete and accurate list of
            references in the required citation style, making it easy to keep track
            of all your sources.
          </PrimaryTextStart>
          <PrimaryTextStart>
            Thank you for choosing Citation Generator Website as your go-to citation
            and bibliography generator. We hope you find our service helpful and
            convenient, and we look forward to helping you with all your citation and
            bibliography needs.
          </PrimaryTextStart>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default AboutPage

import * as React from "react"

import Seo from "../Seo"
import Layout from "./Layout"

import { Grid, Paper } from "@mui/material"
import { MDXProvider } from "@mdx-js/react"
import { PrimaryStart } from "../Typography"

import styled from "@emotion/styled"

import { DetailedHTMLProps, HTMLAttributes } from "react"
import { ReactNode } from "@mdx-js/react/lib"
import PageNavigation from "../PageNavigation"

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

type ParagraphProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

const H1 = (props: HeadingProps) => <PrimaryStart id="title" {...props} />

const H2 = (props: HeadingProps) => <Secondary {...props} />

const Paragraph = (props: ParagraphProps) => <Text {...props} />

const BlockQuote = (props: Props) => <Example {...props} />

const DifferentTip = (props: DivProps) => <Different {...props} />

const ExampleTip = (props: DivProps) => <ExampleDescription {...props} />

const Bibliography = (props: DivProps) => <Bib {...props} />

const Annotation = (props: DivProps) => <Note {...props} />

const components = {
  h1: H1,
  h2: H2,
  H2: H2,
  p: Paragraph,
  blockquote: BlockQuote,
  DifferentTip,
  ExampleTip,
  Bibliography,
  Annotation,
}

type GuideProps = {
  title: string
  description: string
  documents: []
  documentsLink: []
  slug: string
}

const Guide: React.FC<{ pageContext: GuideProps; children: ReactNode }> = ({
  pageContext,
  children,
}) => {
  const { documents, documentsLink, title, description, slug } = pageContext

  return (
    <Layout>
      <Seo path={slug} title={title} description={description} />
      <Grid container bgcolor="primary.main" justifyContent="center" height="100%">
        <Grid
          container
          direction="column"
          justifyContent="center"
          py={2}
          item
          xs={10}
          md={8}
        >
          <Paper
            elevation={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: { xs: "90%", md: "unset" },
              overflowWrap: "break-word",
            }}
          >
            <Grid item py={2} xs={10} container>
              <Grid
                xs={12}
                md={9}
                item
                container
                direction="column"
                flexWrap="nowrap"
              >
                <MDXProvider components={components}>{children}</MDXProvider>
              </Grid>
              <Grid item container xs={3} display={{ xs: "none", md: "inherit" }}>
                <PageNavigation
                  documents={documents}
                  documentsLink={documentsLink}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

const Text = styled.p`
  font-family: "Lato", serif;
  font-weight: 400;
  line-height: 1.88;
  color: #37293c;
`

const Secondary = styled.h2`
  font-family: "Lato", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #241f23;
  margin: 24px 0 0 0;
`

const Different = styled.div`
  border-left: 4px solid #37293c;
  border-radius: 5px;
  background: #67597026;
  margin: 12px 0;
  padding: 12px;

  p {
    margin: 0;
  }
`

const Example = styled.blockquote`
  border-left: 4px solid #675970;
  padding-left: 12px;
  margin: 0;

  p {
    margin: 0;
  }
`

const ExampleDescription = styled.div`
  background: #67597026;
  border-radius: 10px;
  margin: 12px 0;
  padding: 12px;

  p {
    margin: 0;
  }
`

const Bib = styled.div`
  text-indent: -1.5rem;
  margin-left: 1.5rem;
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  p {
    margin: 0;
  }
`

const Note = styled.div`
  padding-left: 2rem;
  p {
    margin: 0;
  }
`

export default Guide

import * as React from "react"
import { Button, Container, Grid, Typography } from "@mui/material"

import styled from "styled-components"

import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import RedditIcon from "@mui/icons-material/Reddit"

import { POPULAR_CSL_METADATA } from "../csl_metadata"
import { useCallback } from "react"
import config from "../config"

const open = (socialLink: string) => {
  window.open(socialLink, "_blank")
}

const Footer: React.FC = () => {
  const shareCallback = useCallback((event) => {
    const a_href = window.location.href
    const encodedA_href = encodeURIComponent(a_href)
    const { twitter, reddit } = config.SOCIAL

    switch (event.currentTarget.id) {
      case "twitter":
        open(
          `${twitter.url}?url=${encodedA_href}&text=${twitter.text}&hashtags=${twitter.hashtags}`,
        )
        break
      case "reddit":
        open(
          `${reddit.url}?title=${reddit.title}&text=${reddit.text} ${encodedA_href}`,
        )
        break
      case "facebook":
        open(
          `https://www.facebook.com/sharer/sharer.php?u=https://citation-creator.com/`,
        )
        break
    }
  }, [])

  return (
    <Container disableGutters maxWidth={false} component="footer">
      <Grid container bgcolor="secondary.light">
        <Grid md={4} xs={12} container justifyContent="center" item>
          <Container>
            <Container>
              <Logo>Citation Generator</Logo>
              <Text maxWidth="60%">
                Create Citation online rapidly, with support for a large number of
                citation styles, for Book, Journal articles.
              </Text>
            </Container>
          </Container>
        </Grid>

        <Grid md={8} xs={12} container direction="column" justifyContent="end" item>
          <Grid>
            <Grid container p={{ xs: 2, md: 0 }}>
              {Object.values(POPULAR_CSL_METADATA).map(({ id }) => (
                <Link key={id} href={`/${id.toLocaleLowerCase()}/`}>
                  {id} Citation Generator
                </Link>
              ))}
            </Grid>

            <Grid container p={{ xs: 2, md: 0 }}>
              <Link href="/about/">About</Link>
              <Link href="/terms/">Terms</Link>
              <Link href="/contact/">Contact Us</Link>
              <Link href="/privacy/">Privacy Policy</Link>
            </Grid>

            <Grid container justifyContent="end" pb={1}>
              <ShareButton id="twitter" onClick={shareCallback}>
                <TwitterIcon fontSize="small" />
              </ShareButton>
              <ShareButton id="reddit" onClick={shareCallback}>
                <RedditIcon fontSize="small" />
              </ShareButton>
              <ShareButton id="facebook" onClick={shareCallback}>
                <FacebookIcon fontSize="small" />
              </ShareButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid bgcolor="#817589">
        <CopyRight>© Citation Generator 2023</CopyRight>
      </Grid>
    </Container>
  )
}

const Logo = styled(Typography)`
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 50px;
  color: #e6daea;
`

const Text = styled(Typography)`
  font-family: "sans-serif";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 25px;
  color: #e6daea;
`

const Link = styled(Button).attrs(() => ({
  size: "small",
}))`
  display: block;
  font-family: sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: #e6daea;
  text-align: center;
  :hover {
    text-decoration: underline;
  }
`

const ShareButton = styled(Link)`
  display: flex;
  align-items: start;
`

const CopyRight = styled(Typography).attrs(() => ({
  noWrap: true,
}))`
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: #e6daea;
  text-align: end;
  padding-right: 12px;
`

export default Footer

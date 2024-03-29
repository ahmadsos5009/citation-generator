import * as React from "react"
import { Box, Grid, Typography } from "@mui/material"
import Seo from "../components/Seo"
import Layout from "../components/pages/Layout"

const preprocessedCitations = [
  {
    style_title: "American Psychological Association",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry">Columbus, C. (1492).<i>How I Discovered America</i>. Barcelona: Hispanic Press.</div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry">Green, R. J., Fred, U. P., &amp; Norbert, W. P. (1900). Things that Go Bump in the Night.<i>Psych. Today</i>,<i>46</i>, 345–678.</div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry">James, K., Harris, G., Jr., &amp; Wollops, W. (1776). American Independence and Magnetism.<i>Revol. Tracts</i>,<i>32</i>, 34–55.</div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry">Phillips, T. P. (1999). Possible Influence of the Magnetosphere on American History.<i>J. Oddball Res.</i>,<i>98</i>, 1000–1003.</div><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry">Smith, J. G., &amp; Weston, H. K. (1954). Nothing Particular in this Year’s History.<i>J. Geophys. Res.</i>,<i>2</i>, 14–15.</div></div>',
    inText:
      "(Columbus, 1492; Green, Fred, & Norbert, 1900; James, Harris, & Wollops, 1776; Phillips, 1999; Smith & Weston, 1954)",
  },
  {
    style: "Institute of Electrical and Electronics Engineers",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry"><div class="csl-left-margin">[1]</div><div class="csl-right-inline">J. G. Smith and H. K. Weston, “Nothing Particular in this Year’s History,”<i>J. Geophys. Res.</i>, vol. 2, pp. 14–15, 1954.</div></div><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry"><div class="csl-left-margin">[2]</div><div class="csl-right-inline">C. Columbus,<i>How I Discovered America</i>. Barcelona: Hispanic Press, 1492.</div></div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry"><div class="csl-left-margin">[3]</div><div class="csl-right-inline">R. J. Green, U. P. Fred, and W. P. Norbert, “Things that Go Bump in the Night,”<i>Psych. Today</i>, vol. 46, pp. 345–678, 1900.</div></div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry"><div class="csl-left-margin">[4]</div><div class="csl-right-inline">T. P. Phillips, “Possible Influence of the Magnetosphere on American History,”<i>J. Oddball Res.</i>, vol. 98, pp. 1000–1003, 1999.</div></div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry"><div class="csl-left-margin">[5]</div><div class="csl-right-inline">K. James, G. Harris Jr., and W. Wollops, “American Independence and Magnetism,”<i>Revol. Tracts</i>, vol. 32, pp. 34–55, 1776.</div></div></div>',
    inText: "[1]–[5]",
  },
  {
    style: "National Library of Medicine",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry"><div class="csl-left-margin">1.</div><div class="csl-right-inline">Smith JG, Weston HK. Nothing Particular in this Year’s History. J Geophys Res. 1954;2:14–15.</div></div><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry"><div class="csl-left-margin">2.</div><div class="csl-right-inline">Columbus C. How I Discovered America. Barcelona: Hispanic Press; 1492.</div></div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry"><div class="csl-left-margin">3.</div><div class="csl-right-inline">Green RJ, Fred UP, Norbert WP. Things that Go Bump in the Night. Psych Today. 1900;46:345–678.</div></div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry"><div class="csl-left-margin">4.</div><div class="csl-right-inline">Phillips TP. Possible Influence of the Magnetosphere on American History. J Oddball Res. 1999;98:1000–1003.</div></div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry"><div class="csl-left-margin">5.</div><div class="csl-right-inline">James K, Harris G Jr, Wollops W. American Independence and Magnetism. Revol Tracts. 1776;32:34–55.</div></div></div>',
    inText: "<sup>1–5</sup>",
  },
  {
    style: "Royal Society of Chemistry",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry"><div class="csl-left-margin">1</div><div class="csl-right-inline">J. G. Smith and H. K. Weston,<i>J. Geophys. Res.</i>, 1954,<b>2</b>, 14–15.</div></div><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry"><div class="csl-left-margin">2</div><div class="csl-right-inline">C. Columbus,<i>How I Discovered America</i>, Hispanic Press, Barcelona, 1492.</div></div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry"><div class="csl-left-margin">3</div><div class="csl-right-inline">R. J. Green, U. P. Fred and W. P. Norbert,<i>Psych. Today</i>, 1900,<b>46</b>, 345–678.</div></div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry"><div class="csl-left-margin">4</div><div class="csl-right-inline">T. P. Phillips,<i>J. Oddball Res.</i>, 1999,<b>98</b>, 1000–1003.</div></div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry"><div class="csl-left-margin">5</div><div class="csl-right-inline">K. James, G. Harris Jr. and W. Wollops,<i>Revol. Tracts</i>, 1776,<b>32</b>, 34–55.</div></div></div>',
    inText: "<sup>1–5</sup>",
  },
  {
    style: "American Chemical Society",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry"><div class="csl-left-margin">(1)</div><div class="csl-right-inline">Smith, J. G.; Weston, H. K. Nothing Particular in This Year’s History.<i>J. Geophys. Res.</i><b>1954</b>,<i>2</i>, 14–15.</div></div><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry"><div class="csl-left-margin">(2)</div><div class="csl-right-inline">Columbus, C.<i>How I Discovered America</i>; Hispanic Press: Barcelona, 1492.</div></div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry"><div class="csl-left-margin">(3)</div><div class="csl-right-inline">Green, R. J.; Fred, U. P.; Norbert, W. P. Things That Go Bump in the Night.<i>Psych. Today</i><b>1900</b>,<i>46</i>, 345–678.</div></div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry"><div class="csl-left-margin">(4)</div><div class="csl-right-inline">Phillips, T. P. Possible Influence of the Magnetosphere on American History.<i>J. Oddball Res.</i><b>1999</b>,<i>98</i>, 1000–1003.</div></div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry"><div class="csl-left-margin">(5)</div><div class="csl-right-inline">James, K.; Harris, G., Jr.; Wollops, W. American Independence and Magnetism.<i>Revol. Tracts</i><b>1776</b>,<i>32</i>, 34–55.</div></div></div>',
    inText: "<sup>1–5</sup>",
  },
  {
    style: "Association for Computing Machinery",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry"><div class="csl-left-margin">[1]</div><div class="csl-right-inline">Christopher Columbus. 1492.<i>How I Discovered America</i>. Hispanic Press, Barcelona.</div></div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry"><div class="csl-left-margin">[2]</div><div class="csl-right-inline">R. J. Green, U. P. Fred, and W. P. Norbert. 1900. Things that Go Bump in the Night.<i>Psych. Today</i>46, (1900), 345–678.</div></div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry"><div class="csl-left-margin">[3]</div><div class="csl-right-inline">Kelly James, George Harris Jr., and Wilby Wollops. 1776. American Independence and Magnetism.<i>Revol. Tracts</i>32, (1776), 34–55.</div></div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry"><div class="csl-left-margin">[4]</div><div class="csl-right-inline">T. P. Phillips. 1999. Possible Influence of the Magnetosphere on American History.<i>J. Oddball Res.</i>98, (1999), 1000–1003.</div></div><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry"><div class="csl-left-margin">[5]</div><div class="csl-right-inline">J. G. Smith and H. K. Weston. 1954. Nothing Particular in this Year’s History.<i>J. Geophys. Res.</i>2, (1954), 14–15.</div></div></div>',
    inText: "[1–5]",
  },
  {
    style: "Council of Science Editors",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry">1. Columbus C. How I Discovered America. Barcelona: Hispanic Press; 1492.</div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry">2. Green RJ, Fred UP, Norbert WP. Things that Go Bump in the Night. 1900;46:345–678.</div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry">3. James K, Harris G Jr, Wollops W. American Independence and Magnetism. 1776;32:34–55.</div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry">4. Phillips TP. Possible Influence of the Magnetosphere on American History. 1999;98:1000–1003.</div><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry">5. Smith JG, Weston HK. Nothing Particular in this Year’s History. 1954;2:14–15.</div></div>',
    inText: "<sup>1–5</sup>",
  },
  {
    style: "Modern Language Association 8th edition",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry">Columbus, Christopher.<i>How I Discovered America</i>. Hispanic Press, 1492.</div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry">Green, R. J., et al. “Things That Go Bump in the Night.”<i>Psych. Today</i>, vol. 46, 1900, pp. 345–678.</div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry">James, Kelly, et al. “American Independence and Magnetism.”<i>Revol. Tracts</i>, vol. 32, 1776, pp. 34–55.</div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry">Phillips, T. P. “Possible Influence of the Magnetosphere on American History.”<i>J. Oddball Res.</i>, vol. 98, 1999, pp. 1000–03.</div><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry">Smith, J. G., and H. K. Weston. “Nothing Particular in This Year’s History.”<i>J. Geophys. Res.</i>, vol. 2, 1954, pp. 14–15.</div></div>',
    inText: "(Smith and Weston; Columbus; Green et al.; Phillips; James et al.)",
  },
  {
    style: "Modern Language Association",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry">Columbus, Christopher.<i>How I Discovered America</i>. Hispanic Press, 1492.</div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry">Green, R. J., et al. “Things That Go Bump in the Night.”<i>Psych. Today</i>, vol. 46, 1900, pp. 345–678.</div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry">James, Kelly, et al. “American Independence and Magnetism.”<i>Revol. Tracts</i>, vol. 32, 1776, pp. 34–55.</div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry">Phillips, T. P. “Possible Influence of the Magnetosphere on American History.”<i>J. Oddball Res.</i>, vol. 98, 1999, pp. 1000–03.</div><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry">Smith, J. G., and H. K. Weston. “Nothing Particular in This Year’s History.”<i>J. Geophys. Res.</i>, vol. 2, 1954, pp. 14–15.</div></div>',
    inText: "(Smith and Weston; Columbus; Green et al.; Phillips; James et al.)",
  },
  {
    style: "Modern Humanities Research Association",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry">Columbus, Christopher,<i>How I Discovered America</i>(Barcelona: Hispanic Press, 1492)</div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry">Green, RJ, UP Fred and WP Norbert, “Things That Go Bump in the Night,”<i>Psych. Today</i>, 46 (1900), 345–678</div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry">James, Kelly, George Harris Jr and Wilby Wollops, “American Independence and Magnetism,”<i>Revol. Tracts</i>, 32 (1776), 34–55</div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry">Phillips, TP, “Possible Influence of the Magnetosphere on American History,”<i>J. Oddball Res.</i>, 98 (1999), 1000–1003</div><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry">Smith, JG and HK Weston, “Nothing Particular in This Year’s History,”<i>J. Geophys. Res.</i>, 2 (1954), 14–15</div></div>',
    inText:
      "J. G. Smith and H. K. Weston, “Nothing Particular in This Year’s History,”<i>J. Geophys. Res.</i>, 2 (1954), 14–15; Christopher Columbus,<i>How I Discovered America</i>(Barcelona: Hispanic Press, 1492); R. J. Green, U. P. Fred and W. P. Norbert, “Things That Go Bump in the Night,”<i>Psych. Today</i>, 46 (1900), 345–678; T. P. Phillips, “Possible Influence of the Magnetosphere on American History,”<i>J. Oddball Res.</i>, 98 (1999), 1000–1003; Kelly James, George Harris Jr. and Wilby Wollops, “American Independence and Magnetism,”<i>Revol. Tracts</i>, 32 (1776), 34–55.",
  },
  {
    style: "Turabian",
    bib: '<div class="csl-bib-body"><div data-csl-entry-id="Citation:d55a94dc-0127-4d8f-befd-01f1a6dd96dc" class="csl-entry">Columbus, Christopher.<i>How I Discovered America</i>. Barcelona: Hispanic Press, 1492.</div><div data-csl-entry-id="Citation:39778dc4-366c-4e93-9e89-87e2e85bea49" class="csl-entry">Green, R. J., U. P. Fred, and W. P. Norbert. “Things That Go Bump in the Night.”<i>Psych. Today</i>46 (1900): 345–678.</div><div data-csl-entry-id="Citation:26a9a333-21b6-4f0b-b2cc-323711806529" class="csl-entry">James, Kelly, George Harris Jr., and Wilby Wollops. “American Independence and Magnetism.”<i>Revol. Tracts</i>32 (1776): 34–55.</div><div data-csl-entry-id="Citation:d76401d7-486c-486f-b4fe-b45dbca95214" class="csl-entry">Phillips, T. P. “Possible Influence of the Magnetosphere on American History.”<i>J. Oddball Res.</i>98 (1999): 1000–1003.</div><div data-csl-entry-id="Citation:83465785-93c0-422d-aaf6-7c87307f946b" class="csl-entry">Smith, J. G., and H. K. Weston. “Nothing Particular in This Year’s History.”<i>J. Geophys. Res.</i>2 (1954): 14–15.</div></div>',
    inText:
      "J. G. Smith and H. K. Weston, “Nothing Particular in This Year’s History,”<i>J. Geophys. Res.</i>2 (1954): 14–15; Christopher Columbus,<i>How I Discovered America</i>(Barcelona: Hispanic Press, 1492); R. J. Green, U. P. Fred, and W. P. Norbert, “Things That Go Bump in the Night,”<i>Psych. Today</i>46 (1900): 345–678; T. P. Phillips, “Possible Influence of the Magnetosphere on American History,”<i>J. Oddball Res.</i>98 (1999): 1000–1003; Kelly James, George Harris Jr., and Wilby Wollops, “American Independence and Magnetism,”<i>Revol. Tracts</i>32 (1776): 34–55.",
  },
]

const CitationsExamplesPage: React.FC = () => {
  return (
    <Layout>
      <Seo path="examples" title="Citation Examples" />
      <Grid container bgcolor="primary.main" justifyContent="center" height="100%">
        <Grid item xs={10} md={6}>
          {preprocessedCitations.map(({ style_title, bib, inText }, index) => (
            <Grid item xs={12} key={index.toString()}>
              <Typography
                component="h1"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{ p: 1 }}
              >
                {style_title}
              </Typography>
              Example of citations:
              <Box padding={2} bgcolor="white">
                <Typography color="text.secondary" padding={0}>
                  Bibliography:
                </Typography>
                <div
                  className="output-viewer"
                  style={{ padding: "4px" }}
                  dangerouslySetInnerHTML={{
                    // @ts-ignore
                    __html: bib,
                  }}
                />
              </Box>
              <Box padding={2} bgcolor="white">
                <Typography color="text.secondary" padding={0}>
                  In text citation:
                </Typography>
                <div
                  className="output-viewer"
                  style={{ padding: "4px" }}
                  dangerouslySetInnerHTML={{
                    __html: inText,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default CitationsExamplesPage

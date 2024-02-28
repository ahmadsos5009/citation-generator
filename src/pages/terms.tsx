import * as React from "react"

import Layout from "../components/pages/Layout"
import Seo from "../components/Seo"
import { Grid, List, ListItem, ListItemText } from "@mui/material"
import { Primary, PrimaryTextStart } from "../components/Typography"

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <Seo path="terms" title="Terms" />
      <Grid
        p={2}
        bgcolor="primary.main"
        container
        justifyContent="center"
        height="100%"
      >
        <Grid md={4} item>
          <Primary>Terms and Conditions</Primary>
          <PrimaryTextStart>
            These terms and conditions govern the use of our citation generator
            website, which provides users with the ability to generate citations and
            store them in their browser for free. By using our website, you agree to
            be bound by these terms and conditions.
          </PrimaryTextStart>
          <List>
            <ListItem>
              <ListItemText
                primary="Use of Service:"
                secondary="Our citation generator website is intended for personal, non-commercial use only.
                 Any unauthorized commercial use of the website is prohibited. You may use the website to
                 generate citations and store them in your browser for your own use. You may not use the website to
                 generate citations for commercial purposes or to store citations for others."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="User Content:"
                secondary="The user citations and information stored in the browser are the sole responsibility
                 of the user. We are not responsible for the accuracy, completeness, or legality of user-generated
                 citations and information. You agree to indemnify and hold us harmless from any claims arising from
                  the use of user-generated citations and information."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Disclaimer of Warranties:"
                secondary={`The citation generator website is provided on an "as is" basis without any warranties of
              any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of
              the citation generator service or the information stored in the browser. We are not responsible for any
              errors or omissions in the citation generator service or the information stored in the browser.`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Limitation of Liability:"
                secondary="In no event shall we be liable for any damages, including without limitation,
                direct or indirect, special, incidental, or consequential damages, losses or expenses arising
                in connection with the use of the citation generator website or the information stored in the browser."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Changes to Terms and Conditions:"
                secondary="We reserve the right to modify these terms and conditions at any time without notice.
                Your continued use of the citation generator website after any changes to these terms and conditions
                constitutes your acceptance of the new terms."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Changes to Privacy Policy:"
                secondary="This Privacy Policy may be updated from time to time to reflect changes to our
                data collection and usage practices. We will notify users of any significant changes
                by updating this page."
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default TermsPage

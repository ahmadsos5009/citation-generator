import * as React from "react"

import Layout from "../components/pages/Layout"
import Seo from "../components/Seo"
import { Grid, List, ListItem, ListItemText } from "@mui/material"
import { Primary, PrimaryText } from "../components/Typography"

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <Seo title="Privacy" />
      <Grid
        p={2}
        bgcolor="primary.main"
        container
        justifyContent="center"
        height="100%"
      >
        <Grid md={4} item>
          <Primary pb={2}>Privacy Policy</Primary>
          <PrimaryText>
            This Privacy Policy outlines the collection, use, and sharing of
            information by our citation generator website. Our goal is to provide a
            safe and secure platform for our users to manage their citations and
            research materials.
          </PrimaryText>
          <List>
            <ListItem>
              <ListItemText
                primary="Information Collection:"
                secondary={
                  "Our citation generator website collects information from users in order to " +
                  "provide them with the services they require. This information includes " +
                  "citations and bibliographic references entered by the user, as well as usage " +
                  "data such as the date and time of use, and the type of browser and device used. " +
                  "Our website also uses cookies to track user preferences and to improve the overall user experience."
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Use of Information:"
                secondary="The information collected by our website is used to provide the citation generator
                service to our users. It is also used to analyze usage patterns and to make improvements to
                the website. We do not share or sell user information to any third party."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Data Storage:"
                secondary="User citations and information are stored in the browser's local storage."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Data Retention:"
                secondary="User citations and information will be stored in the browser until the user decides to
                delete them. We do not retain user information after it has been deleted by the user."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="User Control:"
                secondary="Users have the ability to control their citations and information stored in their
                browser by using the options provided in the citation generator. They may also choose to
                delete their citations and information at any time."
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

export default PrivacyPage

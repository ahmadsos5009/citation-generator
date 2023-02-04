import * as React from "react"

import Layout from "../components/pages/Layout"
import Seo from "../components/Seo"
import { Alert, Fab, Grid, Snackbar, Stack, TextField } from "@mui/material"
import { Primary, PrimaryTextStart } from "../components/Typography"
import { useCallback, useState } from "react"
import { validateFeedback } from "../components/utilities/text-validation"
import sendFeedback from "../components/utilities/feedback-api"

const ContactPage: React.FC = () => {
  const [feedback, setFeedback] = useState("")
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackApiError, setFeedbackApiError] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const onFeedbackChange = useCallback((e) => setFeedback(e.target.value), [])

  const onPublishPost = useCallback(async () => {
    if (validateFeedback(feedback)) {
      const response = await sendFeedback(feedback)
      if (response) {
        setFeedbackSent(true)
      } else {
        setFeedbackApiError(true)
      }
    } else {
      setErrorMessage(
        "Your input should be more than 4 character and less than 200 character",
      )
    }
  }, [feedback])

  return (
    <Layout>
      <Seo title="Contact Us" />
      <Grid
        p={2}
        bgcolor="primary.main"
        container
        justifyContent="center"
        height="100%"
      >
        <Grid md={4} item>
          <Primary>Contact Us</Primary>
          <PrimaryTextStart>
            At Citation Generator Website, we're dedicated to providing you with the
            best possible experience when it comes to generating citations and
            bibliographies. If you have any questions, concerns, or feedback, we're
            here to help.
          </PrimaryTextStart>
          <PrimaryTextStart>
            If you need assistance with our citation generator, have a suggestion for
            how we can improve, Fill out the form on this page to send us a message:
          </PrimaryTextStart>
          <Stack p={2}>
            <TextField
              id="standard-multiline-static"
              sx={{ background: "white" }}
              variant="standard"
              multiline
              rows={4}
              onChange={onFeedbackChange}
            />
            <Fab
              size="medium"
              aria-label="post"
              onClick={onPublishPost}
              sx={{ m: 2, padding: 2 }}
            >
              Send
            </Fab>
          </Stack>
          {feedbackApiError && (
            <Alert severity="error">
              Please try again, there is an issue with the network
            </Alert>
          )}
          {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
          <Snackbar
            open={feedbackSent}
            sx={{ height: "50%" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={2000}
            onClose={() => setFeedbackSent(false)}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Thanks for your Feedback 👍
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage

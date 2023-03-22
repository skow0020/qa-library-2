import Grid from '@material-ui/core/Grid'
import React from 'react'

const NotFound = () => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '60vh', alignItems: 'center', justifyContent: 'center' }}
  >
    <h3 id="not-found">Hmm... the page you are looking for seems to have disappeared... if it has ever existed</h3>
  </Grid>
)

export default NotFound
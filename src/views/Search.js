import React, { useState } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import SearchResults from 'components/common/SearchResults'
import TextField from 'components/common/TextField'
import axios from 'axios'

export default function Search() {
  const [query, setQuery] = useState('')
  const [bookResults, setBookResults] = useState(null)
  const [articleResults, setArticleResults] = useState(null)
  const [tutorialResults, setTutorialResults] = useState(null)
  const [resourceLinkResults, setResourceLinkResults] = useState(null)

  const getInfo = () => {
    axios.get(`${process.env.REACT_APP_ENV_URL}/api/books?search=${query}`)
      .then(({ data }) => setBookResults(data.data))
      .then(axios.get(`${process.env.REACT_APP_ENV_URL}/api/articles?search=${query}`)
        .then(({ data }) => setArticleResults(data.data)
        ))
      .then(axios.get(`${process.env.REACT_APP_ENV_URL}/api/tutorials?search=${query}`)
        .then(({ data }) => setTutorialResults(data.data)
        ))
      .then(axios.get(`${process.env.REACT_APP_ENV_URL}/api/resourceLinks?search=${query}`)
        .then(({ data }) => setResourceLinkResults(data.data)
        ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getInfo()
  }

  return (
    <Container>
      <Grid>
        <form onSubmit={handleSubmit}>
          <TextField id="navbar-search" label="Search for title" value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
      </Grid>
      {bookResults && <SearchResults searchType='Books' results={bookResults} />}
      {tutorialResults && <SearchResults searchType='Tutorials' results={tutorialResults} />}
      {resourceLinkResults && <SearchResults searchType='Resource Links' results={resourceLinkResults} />}
      {articleResults && <SearchResults searchType='Articles' results={articleResults} />}
    </Container>
  )
}

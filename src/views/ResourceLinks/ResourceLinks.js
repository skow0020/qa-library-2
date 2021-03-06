/* eslint-disable react-hooks/exhaustive-deps */

import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { getResourceLinks } from 'api/api'
import CardComponent from 'components/common/CardComponent'
import CategoriesSelection from 'components/common/CategoriesSelection'
import LanguagesSelection from 'components/common/LanguagesSelection'
import LoadError from 'components/common/LoadError'
import Loading from 'components/common/Loading'
import PageTitle from 'components/common/PageTitle'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Colors from 'utils/Colors'
import { getCategoryTheme } from 'utils/util'

const useStyles = makeStyles(() => ({
  addButton: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginLeft: 'auto'
  }
}))

export default function ResourceLinks() {
  const classes = useStyles()
  const [resourceLinks, setResourceLinks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState('')
  const [language, setLanguage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => { filterResourceLinks() }, [category, language])

  const filterResourceLinks = () => {
    const categoryFilter = category ? `category=${category}` : ''
    const languageFilter = language ? `language=${language}` : ''
    const filter = `${categoryFilter}&${languageFilter}`

    setIsLoading(true)
    getResourceLinks(filter)
      .then(response => {
        setResourceLinks(response.data)
        setIsLoading(false)
      }).catch(error => {
        setError(error.message)
        setIsLoading(false)
      })
  }

  if (isLoading) return <Loading />

  if (error) return <LoadError error="ResourceLinks failed to load" />

  return (
    <Grid container>
      <Grid container alignItems="center" >
        <PageTitle title="ResourceLinks" />
        <Button id="add-resourceLink" component={Link} to="/add-resourceLink" variant="contained" className={classes.addButton}>
          Add Resource Link
        </Button>
      </Grid>
      <Grid >
        <form id='filtering-form'>
          <CategoriesSelection id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <LanguagesSelection id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
        </form>
      </Grid>
      <Grid container spacing={4}>
        {!resourceLinks.length && <LoadError error="No resource links match filter" />}
        {resourceLinks.map((post, idx) => (
          <Grid item md={4} key={idx}>
            <CardComponent
              idx={`resourceLink-card-${idx}`}
              url={post.url}
              urlTarget="_blank"
              title={post.title}
              avatar={<Chip
                size="small"
                label={post.category}
                style={{ backgroundColor: post.category ? getCategoryTheme(post.category) : Colors.blue }}
              />}
              backgroundImage={post.backgroundImage}
              body={post.body}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

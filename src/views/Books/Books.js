/* eslint-disable react-hooks/exhaustive-deps */

import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { getBooks } from 'api/api'
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

export default function Books() {
  const classes = useStyles()
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState('')
  const [language, setLanguage] = useState('')
  const [error, setError] = useState('')

  const categoryFilter = category ? `category=${category}` : ''
  const languageFilter = language ? `language=${language}` : ''
  const filter = `${categoryFilter}&${languageFilter}`

  useEffect(() => { filterBooks() }, [category, language])

  const filterBooks = () => {
    setIsLoading(true)
    getBooks(filter)
      .then(response => {
        setBooks(response.data)
        setIsLoading(false)
      }).catch(error => {
        setError(error.message)
        setIsLoading(false)
      })
  }

  if (isLoading) return <Loading />

  if (error) return <LoadError error="Books failed to load" />

  return (
    <Grid container>
      <Grid container alignItems="center" >
        <PageTitle title="Books" />
        <Button id="add-book" component={Link} to="/add-book" variant="contained" className={classes.addButton}>
          Add Book
        </Button>
      </Grid>
      <Grid >
        <form id='filtering-form'>
          <CategoriesSelection id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <LanguagesSelection id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
        </form>
      </Grid>
      <Grid container spacing={4}>
        {!books.length && <LoadError error="No books match filter" />}
        {books.map((post, idx) => (
          <Grid item md={4} key={idx}>
            <CardComponent
              idx={`book-card-${idx}`}
              url={post.url}
              urlTarget="_blank"
              title={post.title}
              subheader={`By ${post.author}`}
              avatar={<Chip
                size="small"
                label={post.category}
                style={{ backgroundColor: post.category ? getCategoryTheme(post.category) : Colors.blue }}
              />}
              backgroundImage={post.backgroundImage}
              body={post.body}
            >
              {post.pdf && <a className="text-fiord-blue" href={post.pdf} target="_blank" rel="noopener noreferrer">PDF Version</a>}
            </CardComponent>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

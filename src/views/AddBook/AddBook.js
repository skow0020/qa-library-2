import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import AlertModal, { showAlert } from 'components/common/AlertModal'
import CategoriesSelection from 'components/common/CategoriesSelection'
import LanguagesSelection from 'components/common/LanguagesSelection'
import PageTitle from 'components/common/PageTitle'
import TextField from 'components/common/TextField'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Colors from 'utils/Colors'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginLeft: 'auto'
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    justifyContent: 'center'
  },
  textField: {
    backgroundColor: Colors.white
  }
}))

export default function AddBook(props) {
  const classes = useStyles()
  const navigate = useNavigate()
  const [backgroundImage, setBackgroundImage] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('General')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [language, setLanguage] = useState('')
  const [pdf, setPdf] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const book = {
      backgroundImage,
      author,
      category,
      url,
      title,
      body,
      pdf,
      language
    }

    axios.post(`${process.env.REACT_APP_ENV_URL}/api/books/`, book)
      .then(
        response => {
          if (response.data.success) showAlert({ message: 'Book added successfully' })
          else showAlert({ message: `Unable to add book: ${JSON.stringify(response.data.error.errors)}` })
          nextPath('/books')
        },
        error => showAlert({ message: `Unable to add book: ${error}` })
      )
  }

  const nextPath = (path) => {
    setTimeout(() => {
      navigate(path)
    }, 2000)
  }

  return (
    <Container component="main">
      <AlertModal />
      <div className={classes.paper}>
        <form id="add-article-form" className={classes.form} onSubmit={handleSubmit}>
          <Grid container>
            <PageTitle title="Add a Book" />
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={12} lg={12} md={12} sm={12}>
              <TextField id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Grid>
            <Grid item xs={12} md={12} sm={6} lg={6}>
              <TextField id="author" label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </Grid>
            <Grid item lg={3} md={6}>
              <LanguagesSelection id="langauge" value={language} onChange={(e) => setLanguage(e.target.value)} />
            </Grid>
            <Grid item lg={3} md={6}>
              <CategoriesSelection id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <TextField id="url" label="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <TextField id="backgroundImage" label="Background Image" value={backgroundImage} onChange={(e) => setBackgroundImage(e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <TextField id="pdf" label="Pdf Url" value={pdf} onChange={(e) => setPdf(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField id="body" label="Description" value={body} multiline={true} minRows={2} maxRows={4} onChange={(e) => setBody(e.target.value)} />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" id="submit-button" className={classes.submit} fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  )

}


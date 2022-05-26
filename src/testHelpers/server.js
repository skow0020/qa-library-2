import { setupServer } from 'msw/node'

export const server = setupServer()

export const libraryAPI = (path) => {
  return new URL(`api/${path}`, `${process.env.REACT_APP_ENV_URL}`).toString()
}



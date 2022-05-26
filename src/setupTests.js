// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { needsDefaultData } from 'testHelpers/rtlHelpers'
import { createServer } from './testHelpers/server'

let server

beforeAll(() => {
  if (needsDefaultData) server = createServer()
})

afterAll(() => {
  if (needsDefaultData) server.shutdown()
})
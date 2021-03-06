import React, { Component } from 'react'

import { Navigate } from 'react-router-dom'

export default function withAuth(ComponentToProtect) {
  // eslint-disable-next-line react/display-name
  return class extends Component {
    constructor() {
      super()
      this.state = {
        loading: true,
        redirect: false
      }
    }

    componentDidMount() {
      fetch('/checkToken')
        .then(res => {
          if (res.status === 200) this.setState({ loading: false })
          else throw new Error(res.error)
        })
        .catch(() => {
          this.setState({ loading: false, redirect: true })
        })
    }
    
    render() {
      const { loading, redirect } = this.state
      if (loading) return null
      if (redirect) return <Navigate to="/library-login" />

      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      )
    }
  }
}
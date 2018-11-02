// @flow
import React, { Component, Fragment } from 'react'
import { pure } from 'recompose'
import { FullScreen, Container, Title } from './style'

const EmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

type State = {
  email: string,
  emailErrorMessage: string,
  password: string,
  passwordErrorMessage: string,
  flashMessage: string
}

class Form extends Component<{}, State> {
  state = {
    email: '',
    emailErrorMessage: '',
    password: '',
    passwordErrorMessage: '',
    flashMessage: ''
  }

  showFlashMessage = () => {
    const { flashMessage } = this.state

    if (flashMessage.length > 0) {
      setTimeout(() => this.setState({ flashMessage: '' }), 1000)
      return <h2>{flashMessage}</h2>
    }
    return null
  }

  handleEmailInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value })
  }

  handlePasswordInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value })
  }

  handleSubmit = () => {
    const { email, password } = this.state
    let emailErrorFlag = false
    let passwordErrorFlag = false

    // email validate
    if (email.length === 0) {
      this.setState({ emailErrorMessage: 'email is requred' })
      emailErrorFlag = true
    } else if (!EmailRegex.test(email)) {
      this.setState({ emailErrorMessage: 'invalid email' })
      emailErrorFlag = true
    } else {
      this.setState({ emailErrorMessage: '' })
    }

    // password validate
    if (password.length === 0) {
      this.setState({
        passwordErrorMessage: 'password is requred'
      })
      passwordErrorFlag = true
    } else if (password.length < 8) {
      this.setState({
        passwordErrorMessage: 'password must be longer than 8 character'
      })
      passwordErrorFlag = true
    } else {
      this.setState({ passwordErrorMessage: '' })
    }

    // no error
    if (!emailErrorFlag && !passwordErrorFlag) {
      this.setState({ flashMessage: 'Success!', email: '', password: '' })
      return
    } else {
      // show error message
      this.setState({ flashMessage: 'Error' })
    }
  }

  render() {
    const {
      email,
      password,
      emailErrorMessage,
      passwordErrorMessage
    } = this.state

    return (
      <Fragment>
        {this.showFlashMessage()}
        <FullScreen>
          <Container>
            <Title>Form</Title>
            <label>Email</label>
            <input onChange={this.handleEmailInput} type="text" value={email} />
            <div>{emailErrorMessage}</div>
            <label>Password</label>
            <input
              onChange={this.handlePasswordInput}
              type="text"
              value={password}
            />
            <div>{passwordErrorMessage}</div>
            <button onClick={this.handleSubmit}>Submit</button>
          </Container>
        </FullScreen>
      </Fragment>
    )
  }
}

export default pure<*>(Form)

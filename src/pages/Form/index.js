// @flow
import React, { Component, Fragment } from 'react'
import { pure } from 'recompose'
import Button from '@material-ui/core/Button'
import {
  TextInput,
  Label,
  FormGroup,
  FullScreen,
  Container,
  Title,
  FlashMessage,
  ErrorMessage,
  SubmitButton
} from './style'

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
    return <FlashMessage state={this.state} />
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
      setTimeout(() => this.setState({ flashMessage: '' }), 1000)
      return
    } else {
      // show error message
      this.setState({ flashMessage: 'Error' })
      setTimeout(() => this.setState({ flashMessage: '' }), 1000)
      return
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
            <FormGroup>
              <Label>Email</Label>
              <TextInput
                onChange={this.handleEmailInput}
                type="text"
                value={email}
                style={
                  passwordErrorMessage.length ? { borderColor: 'red' } : {}
                }
              />
              {emailErrorMessage.length > 0 && (
                <ErrorMessage>{emailErrorMessage}</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <TextInput
                onChange={this.handlePasswordInput}
                type="text"
                value={password}
                style={
                  passwordErrorMessage.length ? { borderColor: 'red' } : {}
                }
              />
              {passwordErrorMessage.length > 0 && (
                <ErrorMessage>{passwordErrorMessage}</ErrorMessage>
              )}
            </FormGroup>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Container>
        </FullScreen>
      </Fragment>
    )
  }
}

export default pure<*>(Form)

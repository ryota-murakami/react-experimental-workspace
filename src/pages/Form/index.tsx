import Button from '@mui/material/Button'
import React, { Component, Fragment } from 'react'
import type { ReactElement } from 'react'

import {
  TextInput,
  Label,
  FormGroup,
  FullScreen,
  Container,
  Title,
  FlashMessage,
  ErrorMessage,
} from './style'

const EmailRegex =
  /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

interface State {
  email: string
  emailErrorMessage: string
  flashMessage: string
  hasError: boolean
  password: string
  passwordErrorMessage: string
  showFlash: boolean
}

class Form extends Component<Record<string, unknown>, State> {
  state: State = {
    email: '',
    emailErrorMessage: '',
    flashMessage: '',
    hasError: false,
    password: '',
    passwordErrorMessage: '',
    showFlash: false,
  }

  showFlashMessage = (): ReactElement => {
    return (
      <FlashMessage
        showFlash={this.state.showFlash}
        flashMessage={this.state.flashMessage}
        hasError={this.state.hasError}
      />
    )
  }

  handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ email: e.currentTarget.value })
  }

  handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: e.currentTarget.value })
  }

  handleSubmit = (): void => {
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
        passwordErrorMessage: 'password is requred',
      })
      passwordErrorFlag = true
    } else if (password.length < 8) {
      this.setState({
        passwordErrorMessage: 'password must be longer than 8 character',
      })
      passwordErrorFlag = true
    } else {
      this.setState({ passwordErrorMessage: '' })
    }

    // no error
    if (emailErrorFlag === false && passwordErrorFlag === false) {
      this.setState({
        email: '',
        flashMessage: 'Success!',
        hasError: false,
        password: '',
        showFlash: true,
      })
      setTimeout(() => this.setState({ flashMessage: '', showFlash: false }), 1000) /* prettier-ignore */
      return
    } else {
      // show error message
      this.setState({ flashMessage: 'Error', hasError: true, showFlash: true })
      setTimeout(() => this.setState({ flashMessage: '', showFlash: false }), 1000) /* prettier-ignore */

      return
    }
  }

  render(): ReactElement {
    const { email, emailErrorMessage, password, passwordErrorMessage } =
      this.state

    const hasEmailError: boolean = emailErrorMessage.length > 0
    const hasPasswordError: boolean = passwordErrorMessage.length > 0

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
                hasError={hasEmailError}
              />
              {hasEmailError && (
                <ErrorMessage>{emailErrorMessage}</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <TextInput
                onChange={this.handlePasswordInput}
                type="text"
                value={password}
                hasError={hasPasswordError}
              />
              {hasPasswordError && (
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

export default Form

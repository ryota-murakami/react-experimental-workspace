import React, { Component, useState, useEffect } from 'react'
import { pure } from 'recompose'
import {
  Container,
  Header,
  LinkContainer,
  HeaderContainer,
  Link
} from './index.style'

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  // Show the debounced value inside of DevTools beside this hook:
  // useDebugValue(debouncedValue);

  useEffect(
    () => {
      const handler = setTimeout(() => setDebouncedValue(value), delay)
      return () => clearTimeout(handler)
    },
    [value, delay]
  )

  return debouncedValue
}

class Index extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header>React Workspace</Header>
        </HeaderContainer>
        <LinkContainer>
          <Link to="/context">・Context</Link>
          <Link to="/todo">・Todo</Link>
          <Link to="/form">・Form</Link>
          <Link to="/anime">・CSS Animation</Link>
        </LinkContainer>
        <div>
          <h2>{useDebounce(10, 30)}</h2>
        </div>
      </Container>
    )
  }
}

export default pure(Index)

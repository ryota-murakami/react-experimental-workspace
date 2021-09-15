import { Component } from 'react'

import { Link } from '../../components/Link'

import { Container, Header, LinkContainer, HeaderContainer } from './index.style'

class Index extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header>Hooks</Header>
        </HeaderContainer>
        <LinkContainer>
          <Link to="hooks/usereducer">・useReducer</Link>
          <Link to="hooks/useeffect">・useEffect</Link>
        </LinkContainer>
      </Container>
    )
  }
}

export default Index

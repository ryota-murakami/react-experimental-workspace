import { Component } from 'react'
import {
  Container,
  Header,
  LinkContainer,
  HeaderContainer,
} from './index.style'
import { Link } from '../../components/Link'

class Index extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header>Hooks</Header>
        </HeaderContainer>
        <LinkContainer>
          <Link to="hooks/usereducer">・useReducer</Link>
        </LinkContainer>
      </Container>
    )
  }
}

export default Index

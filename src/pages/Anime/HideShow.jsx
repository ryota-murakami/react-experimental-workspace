import Button from '@mui/material/Button'
import { styled as muiStyled } from '@mui/material/styles'
import { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
`

const StyledButton = muiStyled(Button)({
  border: '#37da24 2px solid',
  borderRadius: '5px',
  color: '#37da24',
})

const Circle = styled.div`
  width: 200px;
  height: 200px;
  background-color: #434343;
  border-radius: 50%;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.3s linear;
`

export class HideShow extends Component {
  state = {
    visible: false,
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    return (
      <Container>
        <ButtonContainer>
          <StyledButton onClick={this.handleClick}>Toggle</StyledButton>
        </ButtonContainer>
        <Circle visible={this.state.visible ? 'visible' : undefined} />
      </Container>
    )
  }
}

import React from 'react'
import styled from 'styled-components'
import { Link as PureLink } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const HeaderContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`

export const Header = styled.h1`
  font-size: 44px;
  font-weight: bold;
`

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LinkWrapper = styled.div`
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const StyledLink = styled(PureLink)`
  font-size: 24px;
  transition: color 0.15s ease-out;
  &:hover {
    color: #e6e6e9;
  }
`

export const Link = ({ to, children }) => {
  return (
    <LinkWrapper>
      <StyledLink to={to}>{children}</StyledLink>
    </LinkWrapper>
  )
}

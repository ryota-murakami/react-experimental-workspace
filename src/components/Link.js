// @flow
import React from 'react'
import styled from 'styled-components'
import { Link as PureLink } from 'react-router-dom'
import type { LocationShape } from 'react-router-dom'

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
type LinkProps = {
  to: string | LocationShape,
  children: React$Element<*>
}
export const Link = ({ to, children }: LinkProps) => {
  return (
    <LinkWrapper>
      <StyledLink to={to}>{children}</StyledLink>
    </LinkWrapper>
  )
}

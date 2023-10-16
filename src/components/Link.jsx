import { Link as PureLink } from 'react-router-dom'
import styled from 'styled-components'

const LinkWrapper = styled.div`
  font-size: 24px;
  padding: 10px;
  background-color: lightblue;
  border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px;
`
const StyledLink = styled(PureLink)`
  font-size: 24px;
  transition: color 0.15s ease-out;
  &:hover {
    color: #e6e6e9;
  }
`

export const Link = ({ children, to }) => {
  return (
    <LinkWrapper>
      <StyledLink to={to}>{children}</StyledLink>
    </LinkWrapper>
  )
}

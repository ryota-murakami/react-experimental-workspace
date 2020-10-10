import styled from 'styled-components'

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (prefers-color-scheme: dark) {
    background-color: #333;
  }
`

export const Contents = styled.div`
  min-height: 50%;
  min-width: 50%;
  background-color: #111;
  padding: 30px;

  section {
    padding: 20px;
  }
`

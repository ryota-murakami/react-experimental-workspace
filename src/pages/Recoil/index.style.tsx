import styled from 'styled-components'

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (prefers-color-scheme: dark) {
    background-color: rgba(23, 97, 49, 0.4);
  }
`

export const Container = styled.div`
  min-height: 50%;
  min-width: 50%;
  background-color: cornsilk;
`

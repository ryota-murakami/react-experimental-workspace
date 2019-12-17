import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;

    h1 {
      font-size: 44px;
      font-weight: bold;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    width: 100%;
    height: 150px;
    display: grid;
    place-content: center;

    h1 {
      font-size: 44px;
      font-weight: bold;
    }
  }

  main {
    width: 1400px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
`

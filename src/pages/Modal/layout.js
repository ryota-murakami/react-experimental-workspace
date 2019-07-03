import styled from 'styled-components'

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px;
  display: flex;
  flex-direction: column;

  input {
    outline: 0;
    font-size: 14px;
    word-wrap: break-word;
    line-height: 1em;
    white-space: normal;
    min-height: 2em;
    background: #fff;
    display: inline-block;
    padding: 1em 2em 1em 1em;
    color: rgba(0, 0, 0, 0.87);
    box-shadow: none;
    border: 1px solid rgba(34, 36, 38, 0.15);
    borderradius: 30rem;
    transition: box-shadow, 0.1s ease, width 0.1s ease;
    &:hover,
    &:focus {
      border-color: #96c8da;
      box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    }
  }
  .header {
    text-align: center;
  }

  .select-container {
    text-align: center;
  }
`

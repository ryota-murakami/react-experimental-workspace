import React, { Component } from 'react'
import { Layout } from './index.style'
import { Link } from '../components/Link'

class Index extends Component {
  render() {
    return (
      <Layout>
        <header>
          <h1>React Garden</h1>
        </header>
        <main>
          <Link to="/dnd">・DnD</Link>
          <Link to="/recoil">・Recoil</Link>
          <Link to="/hooks">・Hooks</Link>
          <Link to="/context">・Context</Link>
          <Link to="/form">・Form</Link>
          <Link to="/anime">・CSS Animation</Link>
          <Link to="/modal">・Modal</Link>
          <Link to="/selectbox">・SelectBox</Link>
          <Link to="/tooltip">・Tooltip</Link>
          <Link to="/backend">・Backend</Link>
        </main>
      </Layout>
    )
  }
}

export default Index

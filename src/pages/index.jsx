import { Component } from 'react'

import { Link } from '../components/Link'
import { PageContainer } from '../components/PageContainer'

import styles from './index.module.css'

class Index extends Component {
  render() {
    return (
      <PageContainer>
        <header className={styles.header}>
          <h1 className={styles.h1}>React Experimental Workspace</h1>
        </header>
        <main className={styles.main}>
          <Link to="/dnd">DnD</Link>
          <Link to="/recoil">Recoil</Link>
          <Link to="/hooks">Hooks</Link>
          <Link to="/context">Context</Link>
          <Link to="/form">Form</Link>
          <Link to="/anime">CSS Animation</Link>
          <Link to="/modal">Modal</Link>
          <Link to="/selectbox">SelectBox</Link>
          <Link to="/tooltip">Tooltip</Link>
          <Link to="/forwardRef">ForwardRef</Link>
          <Link to="/search">Search</Link>
          <Link to="/use">Use</Link>
        </main>
      </PageContainer>
    )
  }
}

export default Index

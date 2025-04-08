import { Component } from 'react'

import { Link } from '../components/Link'
import { Page } from '../components/Page'

import styles from './index.module.css'

class Index extends Component {
  render() {
    return (
      <Page.Container>
        <header className={styles.header}>
          <h1 className={styles.h1}>React Experimental Workspace</h1>
        </header>
        <main className={styles.main}>
          <Link to="/dnd">DnD</Link>
          <Link to="/context">Context</Link>
          <Link to="/form">Form</Link>
          <Link to="/anime">CSS Animation</Link>
          <Link to="/modal">Modal</Link>
          <Link to="/search">Search</Link>
          <Link to="/windowOpen">WindowOpen</Link>
          <Link to="/refcompare">RefCompare</Link>
          <Link to="/imageupload">ImageUpload</Link>
          <Link to="/dateform">DateForm</Link>
          <Link to="/arrayform">ArrayForm</Link>
          <Link to="/contextmenu">ContextMenu</Link>
          <Link to="/multi-file-upload">MultiFileUpload</Link>
        </main>
      </Page.Container>
    )
  }
}

export default Index

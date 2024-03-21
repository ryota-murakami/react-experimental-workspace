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
          <Link to="/figma">Figma</Link>
          <Link to="/suggestinput">SuggestInput</Link>
          <Link to="/htmldaialog">HtmlDaialog</Link>
          <Link to="/windowOpen">WindowOpen</Link>
          <Link to="/refcompare">RefCompare</Link>
          <Link to="/re-render-1">ReRender_1</Link>
          <Link to="/imageupload">ImageUpload</Link>
        </main>
      </Page.Container>
    )
  }
}

export default Index

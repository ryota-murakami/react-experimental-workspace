import React from 'react'

import Header from '../../components/Header'
import { Page } from '../../components/Page'

import styles from './button.module.css'
interface Props {}

const Figma: React.FC<Props> = () => {
  return (
    <Page.Container>
      <Header>
        <Header.H1>Figma</Header.H1>
      </Header>
      <div className="w-full grid place-content-center">
        <button className={styles.button}>Button</button>
      </div>
    </Page.Container>
  )
}

export default Figma

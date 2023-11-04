import React from 'react'

import Header from '../../components/Header'
import { PageContainer } from '../../components/PageContainer'

import styles from './button.module.css'
interface Props {}

const Figma: React.FC<Props> = () => {
  return (
    <PageContainer>
      <Header>
        <Header.H1>Figma</Header.H1>
      </Header>
      <div className="w-full grid place-content-center">
        <button className={styles.button}>Button</button>
      </div>
    </PageContainer>
  )
}

export default Figma

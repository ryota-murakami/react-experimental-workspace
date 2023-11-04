import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import axios from 'axios'
import React, { use } from 'react'

import type { usStates } from '../../../mockAPI/fixtures/usStates'
import Header from '../../components/Header'
import { Page } from '../../components/Page'
interface Props {}

const Use: React.FC<Props> = () => {
  const { data } = use(axios.get<typeof usStates>('/api/states'))
  return (
    <Page.Container>
      <Header>
        <Header.H1>Use</Header.H1>
      </Header>
      <div className="w-full grid place-content-center">
        <div>
          {data
            ? data.map((v, i) => (
                <ListItem key={i} component="div" disablePadding>
                  <ListItemButton>
                    <ListItemText primary={<Header.H2>{v}</Header.H2>} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
        </div>
      </div>
    </Page.Container>
  )
}

export default Use

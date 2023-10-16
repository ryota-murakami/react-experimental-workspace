import { CircleLoader } from 'react-spinners'

import Container from './Container'

export const Loading = () => {
  return (
    <Container>
      <CircleLoader size={150} color={'#36D7B7'} />
    </Container>
  )
}

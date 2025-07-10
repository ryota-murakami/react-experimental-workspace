import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const MyButton = styled(Button)({
  height: 58,
})

MyButton.defaultProps = {
  variant: 'outlined',
  size: 'large',
}

export default MyButton

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const MyButton = styled(Button)(({ theme }) => ({
  height: 58,
  minWidth: 200,
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
}))

export default function StyledButton(props) {
  return <MyButton variant="outlined" size="large" {...props} />
}

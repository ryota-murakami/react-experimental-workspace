import Button from '@mui/material/Button'
import { withStyles } from '@mui/styles'
import classNames from 'classnames'

const styles = {
  root: {
    height: 58,
  },
}

const MyButton = (props) => {
  const { classes, className } = props
  return (
    <Button
      variant="outlined"
      size="large"
      className={classNames(classes.root, className)}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default withStyles(styles)(MyButton)

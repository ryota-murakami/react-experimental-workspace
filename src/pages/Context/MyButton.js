import Button from '@material-ui/core/Button/Button'
import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

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

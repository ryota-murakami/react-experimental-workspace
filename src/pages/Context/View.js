import React, { Fragment } from 'react'
import { MyContext } from './index'
import { css } from 'emotion'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = {
  root: {
    height: 58
  }
}

const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 36px;
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function View(props) {
  const { classes, className } = props

  return (
    <div className={layout}>
      <MyContext.Consumer>
        {context => (
          <Fragment>
            <h1>count: {context.count}</h1>
            <Button
              variant="outlined"
              size="large"
              className={classNames(classes.root, className)}
              onClick={context.increment}
            >
              increment
            </Button>
          </Fragment>
        )}
      </MyContext.Consumer>
    </div>
  )
}

export default withStyles(styles)(View)

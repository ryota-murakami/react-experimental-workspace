import React, { Fragment, useContext } from 'react'
import { css } from 'emotion'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { pure } from 'recompose'
import StoreContext from './StoreContext'

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
  const { store, setStore } = useContext(StoreContext)

  const MyButton = props => (
    <Button
      variant="outlined"
      size="large"
      className={classNames(classes.root, className)}
      {...props}
    >
      {props.children}
    </Button>
  )

  return (
    <div className={layout}>
      <Fragment>
        <h1>Age: {store.age}</h1>
      </Fragment>
      <MyButton onClick={() => setStore({ age: store.age + 1 })}>
        Increase Age
      </MyButton>
      <MyButton onClick={() => setStore({ name: null })}>Name Null</MyButton>
    </div>
  )
}

export default pure(withStyles(styles)(View))

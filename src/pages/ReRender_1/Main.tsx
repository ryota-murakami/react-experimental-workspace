import React, { memo } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

const Main: React.FC<ComponentPropsWithoutRef<'main'>> = memo(
  ({ children, ...rest }) => {
    return <main {...rest}>{children}</main>
  },
)
Main.displayName = 'Main'

export default Main

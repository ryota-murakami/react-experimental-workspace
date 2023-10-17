import React from 'react'
import ReactDOM from 'react-dom/client'

import '@radix-ui/themes/styles.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './Routes'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(<App />)

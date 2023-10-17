import ReactDOM from 'react-dom/client'

import '@radix-ui/themes/styles.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './Routes'

const root = ReactDOM.createRoot(document.getElementById('root')!)

// Setup MSW mock server in development
if (process.env.NODE_ENV === 'development') {
  // Certify MSW's Service Worker is available before start React app.
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start()
    }) // Run <App /> when Service Worker is ready to intercept requests.
    .then(() => {
      root.render(<App />)
    })
  // Never setup MSW mock server in production
} else if (process.env.NODE_ENV === 'production') {
  root.render(<App />)
}

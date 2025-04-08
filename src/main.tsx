import ReactDOM from 'react-dom/client'

import '@radix-ui/themes/styles.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import AppRoutes from './Routes'

const root = ReactDOM.createRoot(document.getElementById('root')!)

// Certify MSW's Service Worker is available before start React app.
import('../mockAPI/browser')
  .then(({ worker }) => {
    worker.start()
  }) // Run <AppRoutes /> when Service Worker is ready to intercept requests.
  .then(() => {
    root.render(<AppRoutes />)
  })

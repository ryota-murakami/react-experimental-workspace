import { setupWorker } from 'msw/browser'

import { routes } from './routes'

// This configures a Service Worker with the given request routes.
export const worker = setupWorker(...routes)

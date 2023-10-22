// src/mocks/browser.js
import { setupWorker } from 'msw'

import { routes } from './routes'

// This configures a Service Worker with the given request routes.
export const worker = setupWorker(...routes)

import type { ResponseResolver } from 'msw'
import { HttpResponse } from 'msw'

import { usStates } from '../fixtures/usStates'

export const statesHandler: ResponseResolver = async () =>
  HttpResponse.json(usStates)

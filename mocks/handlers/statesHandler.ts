import type { ResponseResolver } from 'msw'
import { HttpResponse } from 'msw'

import { usStates } from '../usStates'

export const statesHandler: ResponseResolver = async () =>
  HttpResponse.json(usStates)

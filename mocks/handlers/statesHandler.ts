import type { ResponseResolver, RestRequest, RestContext } from 'msw'

import { usStates } from '../usStates'

export const statesHandler: ResponseResolver<
  RestRequest,
  RestContext,
  typeof usStates
> = async (_req, res, ctx) => res(ctx.status(200), ctx.json(usStates))

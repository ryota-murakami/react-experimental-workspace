import { HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'

import { usStates } from '../fixtures/usStates'

export const searchHandler: ResponseResolver = async ({ request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')!
  if (query.length === 0)
    return HttpResponse.json(['Not Found.'], { status: 200 })
  // Filter your data based on the query
  const data = usStates.filter((item) => item.includes(query))
  return HttpResponse.json(data, { status: 200 })
}

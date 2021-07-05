/* eslint-disable import/prefer-default-export */
import { rest } from 'msw'

import { country } from 'test-utils/data'

export const handlers = [
  rest.get('http://universities.hipolabs.com/search', (req, res, ctx) => {
    const name = req.url.searchParams.get('name')

    if (!name) {
      return res(ctx.status(400))
    }

    return res(ctx.json([...country]))
  }),
]

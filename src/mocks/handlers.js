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

  rest.get('http://localhost:3030/users', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          name: 'John Doe',
          email: 'john_doe@email.com',
        },
        {
          id: 2,
          name: 'John  Smith',
          email: 'john_smith@email.com',
        },
      ])
    )
  ),

  rest.post('http://localhost:3030/users', (req, res, ctx) => res(ctx.json({ status: 'success' }))),
]

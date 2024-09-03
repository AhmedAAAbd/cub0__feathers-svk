// src/hooks/get-user-by-token.js

import { NotAuthenticated } from '@feathersjs/errors'
import jwt from 'jsonwebtoken'

export const getUserByTokens = async (context) => {
  const { app, data } = context

  // Check if the access token is provided in the request data
  const { accessToken } = data

  if (!accessToken) {
    throw new NotAuthenticated('No access token provided.')
  }

  try {
    // Verify the token using the secret key from your app's authentication config
    const payload = jwt.verify(accessToken, app.get('authentication').secret)

    // Fetch the user by their ID (which is usually in the payload)
    const user = await app.service('users').get(payload.sub)

    if (!user) {
      throw new NotAuthenticated('Invalid token: User not found.')
    }

    // Attach the user to the context result
    context.result = user
  } catch (error) {
    throw new NotAuthenticated('Invalid token.')
  }

  return context
}

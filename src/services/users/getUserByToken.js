// src/services/user-by-token/user-by-token.service.js

import jwt from 'jsonwebtoken'
import { NotAuthenticated } from '@feathersjs/errors'

class UserByTokenService {
  constructor(app) {
    this.app = app
  }

  async create(data, params) {
    const { token } = data

    console.log('>>>>>>>', token)

    if (!token) {
      throw new NotAuthenticated('Token is missing')
    }

    try {
      // Decode the token and verify it
      const payload = jwt.verify(token, this.app.get('authentication').secret)

      // Retrieve the user by id or any other property from payload
      const user = await this.app.service('users').get(payload.sub) // Assuming 'sub' is the user ID in the JWT payload

      if (!user) {
        throw new NotAuthenticated('User not found')
      }

      const { email, avatar, ...other } = user

      return { email, avatar, isAuthorized: true }
    } catch (error) {
      throw new NotAuthenticated('Invalid token')
    }
  }
}

export const userByToken = (app) => {
  app.use('/user-by-token', new UserByTokenService(app))
}

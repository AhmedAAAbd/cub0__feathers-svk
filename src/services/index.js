import { food } from './foods/foods.js'
import { user } from './users/users.js'
import { userByToken } from './users/getUserByToken.js'
export const services = (app) => {
  app.configure(food)

  app.configure(user)
  app.configure(userByToken)

  // All services will be registered here
}

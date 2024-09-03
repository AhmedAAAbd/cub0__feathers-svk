// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  foodDataValidator,
  foodPatchValidator,
  foodQueryValidator,
  foodResolver,
  foodExternalResolver,
  foodDataResolver,
  foodPatchResolver,
  foodQueryResolver
} from './foods.schema.js'
import { FoodService, getOptions } from './foods.class.js'
import { foodPath, foodMethods } from './foods.shared.js'

export * from './foods.class.js'
export * from './foods.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const food = (app) => {
  // Register our service on the Feathers application
  app.use(foodPath, new FoodService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: foodMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(foodPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(foodExternalResolver),
        schemaHooks.resolveResult(foodResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(foodQueryValidator), schemaHooks.resolveQuery(foodQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(foodDataValidator), schemaHooks.resolveData(foodDataResolver)],
      patch: [schemaHooks.validateData(foodPatchValidator), schemaHooks.resolveData(foodPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

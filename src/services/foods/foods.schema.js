// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const foodSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Food', additionalProperties: false }
)
export const foodValidator = getValidator(foodSchema, dataValidator)
export const foodResolver = resolve({})

export const foodExternalResolver = resolve({})

// Schema for creating new entries
export const foodDataSchema = Type.Pick(foodSchema, ['text'], {
  $id: 'FoodData'
})
export const foodDataValidator = getValidator(foodDataSchema, dataValidator)
export const foodDataResolver = resolve({})

// Schema for updating existing entries
export const foodPatchSchema = Type.Partial(foodSchema, {
  $id: 'FoodPatch'
})
export const foodPatchValidator = getValidator(foodPatchSchema, dataValidator)
export const foodPatchResolver = resolve({})

// Schema for allowed query properties
export const foodQueryProperties = Type.Pick(foodSchema, ['_id', 'text'])
export const foodQuerySchema = Type.Intersect(
  [
    querySyntax(foodQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const foodQueryValidator = getValidator(foodQuerySchema, queryValidator)
export const foodQueryResolver = resolve({})

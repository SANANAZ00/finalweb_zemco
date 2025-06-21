import { type SchemaTypeDefinition } from 'sanity'

import product from './product'
// ...other imports

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}

import { type SchemaTypeDefinition } from 'sanity'
import globalConfig from './globalConfig'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globalConfig],
}

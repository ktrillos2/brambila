import { type SchemaTypeDefinition } from 'sanity'
import globalConfig from './globalConfig'
import hero from './hero'
import property from './property'
import homeCollection from './homeCollection'
import services from './services'
import contact from './contact'
import propertyConfigs from './propertyConfigs'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globalConfig, hero, property, propertyConfigs, homeCollection, services, contact],
}

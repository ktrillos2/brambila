import { type SchemaTypeDefinition } from 'sanity'
import globalConfig from './globalConfig'
import hero from './hero'
import property from './property'
import homeCollection from './homeCollection'
import services from './services'
import contact from './contact'
import propertyConfigs from './propertyConfigs'
import about from './about'
import philosophy from './philosophy'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globalConfig, hero, property, propertyConfigs, homeCollection, services, contact, about, philosophy],
}

import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      // Property Group
      S.listItem()
        .title('Gestión de Propiedades')
        .child(
          S.list()
            .title('Propiedades')
            .items([
              S.documentTypeListItem('property').title('Propiedades'),
              S.documentTypeListItem('propertyConfigs').title('Configuración y Filtros'),
            ])
        ),

      S.divider(),

      // General Content Group
      S.listItem()
        .title('Contenido General')
        .child(
          S.list()
            .title('Secciones')
            .items([
              S.documentTypeListItem('hero').title('Hero'),
              S.documentTypeListItem('homeCollection').title('Colección Privada'),
              S.documentTypeListItem('services').title('Servicios'),
              S.documentTypeListItem('contact').title('Contacto'),
            ])
        ),

      S.divider(),

      // Configuration
      S.documentTypeListItem('globalConfig').title('Configuración Global'),
    ])

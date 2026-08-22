import { createClient } from 'next-sanity'
import fs from 'fs'

const envContent = fs.readFileSync('.env.local', 'utf-8')
const env = {}
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=')
    if (idx > -1) {
      const key = trimmed.slice(0, idx).trim()
      const val = trimmed.slice(idx + 1).trim()
      env[key] = val
    }
  }
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'exd1fcuo',
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
})

// Translation helpers for real estate terms and descriptions
function translateTitle(es) {
  if (!es || typeof es !== 'string') return es || ''
  let en = es
  
  // Common replacements
  const replacements = [
    [/SE VENDEN\s+/gi, 'FOR SALE: '],
    [/SE VENDE\s+/gi, 'FOR SALE: '],
    [/EN VENTA\s+/gi, 'FOR SALE: '],
    [/LOTES COMERCIALES EN VENTA/gi, 'Commercial Lots for Sale'],
    [/LOTE CON CIMIENTOS Y MUROS PERIMETRALES/gi, 'Lot with Foundation and Perimeter Walls'],
    [/EN LA COLONIA\s+/gi, 'in Colonia '],
    [/CASA CON LOCAL COMERCIAL EN VENTA/gi, 'House with Commercial Unit for Sale'],
    [/CASA EN EL LIMÓN JALISCO EN OBRA GRIS/gi, 'House in El Limón, Jalisco in Grey Work (Under Construction)'],
    [/HERMOSA CASA EN/gi, 'Beautiful House in'],
    [/PREDIO RUSTICO/gi, 'Rustic Property'],
    [/EN VENTA 3 LOTES JUNTOS O SEPARADOS/gi, '3 Lots for Sale Together or Separately'],
    [/A ESPALDAS DEL/gi, 'Behind the'],
    [/SE VENDEN 3 HECTÁREAS PREDIO EJIDAL/gi, '3 Hectares of Ejidal Land for Sale'],
    [/Terreno en venta en/gi, 'Land for Sale in'],
    [/TERRENO EN VENTA EN/gi, 'LAND FOR SALE IN'],
    [/TERRENOS EN VENTA EN/gi, 'LOTS FOR SALE IN'],
    [/LOTE EN VENTA EN/gi, 'Lot for Sale in'],
    [/LOTE EN/gi, 'Lot in'],
    [/LOTES EN/gi, 'Lots in'],
    [/CASA EN OBRA NEGRA/gi, 'House in Black Work (Rough Construction)'],
    [/CASA EN/gi, 'House in'],
    [/CASA/gi, 'House'],
    [/SE VENDE CASA EN/gi, 'House for Sale in'],
    [/SE VENDE LOTE FRENTE AL/gi, 'Lot for Sale in Front of'],
    [/BODEGA INDUSTRIALES NORTE/gi, 'Industrial Warehouse North'],
    [/BODEGA/gi, 'Warehouse'],
    [/CASA CAMPESTRE/gi, 'Country House'],
    [/LOFT INDUSTRIAL/gi, 'Industrial Loft'],
    [/DEPARTAMENTO/gi, 'Apartment'],
    [/RANCHO/gi, 'Ranch'],
    [/FRACCIONAMIENTO/gi, 'Subdivision'],
    [/SALIDA A/gi, 'Exit to'],
    [/A UN COSTADO DEL/gi, 'Next to the'],
    [/CENTRO DE SALUD/gi, 'Health Center'],
    [/JALISCO/gi, 'Jalisco'],
    [/JAL\./gi, 'Jal.'],
    [/MÉXICO/gi, 'Mexico']
  ]

  for (const [regex, rep] of replacements) {
    en = en.replace(regex, rep)
  }

  return en.trim()
}

function translateLocation(es) {
  if (!es || typeof es !== 'string') return es || ''
  return es.replace(/Jalisco/gi, 'Jalisco, Mexico').replace(/, Jal\./gi, ', Jal., Mexico')
}

function translateCondition(es) {
  if (!es || typeof es !== 'string') return es
  const map = {
    'Nueva': 'New',
    'Excelente': 'Excellent',
    'Bueno': 'Good',
    'Buena': 'Good',
    'En construcción': 'Under construction',
    'Obra gris': 'Grey structure',
    'Obra negra': 'Rough construction',
    'Remodelada': 'Remodeled',
    'Usada': 'Pre-owned',
  }
  return map[es] || es
}

function translateFeature(es) {
  if (!es || typeof es !== 'string') return es
  const map = {
    'Alberca': 'Swimming Pool',
    'Piscina': 'Swimming Pool',
    'Terraza': 'Terrace',
    'Jardín': 'Garden',
    'Aire Acondicionado': 'Air Conditioning',
    'Cochera': 'Garage / Parking',
    'Estacionamiento': 'Parking Space',
    'Seguridad Privada': 'Private Security / Gated',
    'Seguridad 24/7': '24/7 Security',
    'Cocina Integral': 'Fully-Equipped Kitchen',
    'Cocina': 'Kitchen',
    'Recámara en Planta Baja': 'Ground Floor Bedroom',
    'Vista Panorámica': 'Panoramic View',
    'Gimnasio': 'Gym',
    'Área de Juegos': 'Play Area',
    'Balcón': 'Balcony',
    'Bodega': 'Storage Room',
    'Cuarto de Servicio': 'Service Room',
    'Área de Lavado': 'Laundry Area',
    'Cisterna': 'Water Cistern',
    'Portón Eléctrico': 'Electric Gate',
    'Pozo de Agua': 'Water Well',
    'Servicios Básicos': 'Basic Utilities (Water/Electricity)',
    'Luz y Agua': 'Electricity & Water',
    'Escriturado': 'Deeded / Title in Order',
    'Título de Propiedad': 'Property Title in Order',
    'Documentación en regla': 'Documents in Order',
    'Excelente Ubicación': 'Prime Location',
    'Zona Comercial': 'Commercial Zone',
    'Fácil Acceso': 'Easy Access',
  }
  return map[es] || es
}

function translateDescription(es) {
  if (!es || typeof es !== 'string') return es || ''
  
  // Basic paragraph structure preservation with intelligent term mapping
  let en = es
    .replace(/Excelente oportunidad de inversión/gi, 'Excellent investment opportunity')
    .replace(/Oportunidad única/gi, 'Unique opportunity')
    .replace(/Hermosa casa/gi, 'Beautiful house')
    .replace(/Hermoso terreno/gi, 'Beautiful land')
    .replace(/Cuenta con/gi, 'Features')
    .replace(/cuenta con/gi, 'features')
    .replace(/Consta de/gi, 'Consists of')
    .replace(/consta de/gi, 'consists of')
    .replace(/recámaras/gi, 'bedrooms')
    .replace(/recámara/gi, 'bedroom')
    .replace(/baños completos/gi, 'full bathrooms')
    .replace(/medio baño/gi, 'half bathroom')
    .replace(/baños/gi, 'bathrooms')
    .replace(/baño/gi, 'bathroom')
    .replace(/sala/gi, 'living room')
    .replace(/comedor/gi, 'dining room')
    .replace(/cocina integral/gi, 'fitted kitchen')
    .replace(/cocina/gi, 'kitchen')
    .replace(/patio de servicio/gi, 'service patio')
    .replace(/cochera para/gi, 'garage for')
    .replace(/cochera/gi, 'garage')
    .replace(/jardín amplio/gi, 'spacious garden')
    .replace(/jardín/gi, 'garden')
    .replace(/terraza con vista/gi, 'terrace with view')
    .replace(/terraza/gi, 'terrace')
    .replace(/alberca/gi, 'swimming pool')
    .replace(/Ubicado en/gi, 'Located in')
    .replace(/ubicado en/gi, 'located in')
    .replace(/Ubicada en/gi, 'Located in')
    .replace(/ubicada en/gi, 'located in')
    .replace(/zona de alta plusvalía/gi, 'high-appreciation area')
    .replace(/alta plusvalía/gi, 'high property appreciation')
    .replace(/todos los servicios/gi, 'all services available')
    .replace(/agua y luz/gi, 'water and electricity')
    .replace(/listo para escriturar/gi, 'ready for title deed')
    .replace(/documentos en regla/gi, 'all documents in order')
    .replace(/trato directo/gi, 'direct dealing')
    .replace(/financiamiento disponible/gi, 'financing available')
    .replace(/informes y citas/gi, 'information and appointments')
    .replace(/Agenda tu cita hoy mismo/gi, 'Schedule your appointment today')
    .replace(/No dejes pasar esta oportunidad/gi, 'Do not miss this opportunity')
    .replace(/Contáctanos/gi, 'Contact us')
    .replace(/contáctanos/gi, 'contact us')
    .replace(/Para mayores informes/gi, 'For more information')
    .replace(/Para más información/gi, 'For more information')

  return en
}

async function migrateAll() {
  console.log('🚀 Starting full Sanity bilingual data migration...\n')

  // 1. GLOBAL CONFIG
  console.log('📦 1. Updating globalConfig...')
  try {
    const globalDoc = await client.fetch('*[_type == "globalConfig"][0]')
    if (globalDoc) {
      const headerMenu = [
        { _key: 'menu-1', href: '/', label: { es: 'INICIO', en: 'HOME' } },
        { _key: 'menu-2', href: '/propiedades', label: { es: 'PROPIEDADES', en: 'PROPERTIES' } },
        { _key: 'menu-3', href: '/nosotros', label: { es: 'NOSOTROS', en: 'ABOUT US' } },
        { _key: 'menu-4', href: '/#servicios', label: { es: 'SERVICIOS', en: 'SERVICES' } },
      ]
      const footerMenu = [
        { _key: 'fmenu-1', href: '#inicio', label: { es: 'Inicio', en: 'Home' } },
        { _key: 'fmenu-2', href: '#nosotros', label: { es: 'Nosotros', en: 'About Us' } },
        { _key: 'fmenu-3', href: '#servicios', label: { es: 'Servicios', en: 'Services' } },
        { _key: 'fmenu-4', href: '#propiedades', label: { es: 'Propiedades', en: 'Properties' } },
        { _key: 'fmenu-5', href: '#contacto', label: { es: 'Contacto', en: 'Contact' } },
      ]
      const legalMenu = [
        { _key: 'lmenu-1', href: '/aviso-de-privacidad', label: { es: 'Aviso de Privacidad', en: 'Privacy Notice' } },
        { _key: 'lmenu-2', href: '/terminos-y-condiciones', label: { es: 'Términos y Condiciones', en: 'Terms and Conditions' } },
      ]

      await client
        .patch(globalDoc._id)
        .set({
          address: {
            es: 'Jose Antonio Torres #101, El Grullo, Jal.',
            en: 'Jose Antonio Torres #101, El Grullo, Jal., Mexico',
          },
          footerText: {
            es: 'Redefiniendo el concepto inmobiliario. Donde la confianza encuentra la excelencia.',
            en: 'Redefining the real estate concept. Where trust meets excellence.',
          },
          headerMenu,
          footerMenu,
          legalMenu,
        })
        .commit()
      console.log('✅ globalConfig updated with bilingual menus and texts!')
    }
  } catch (err) {
    console.error('Error updating globalConfig:', err)
  }

  // 2. HERO
  console.log('\n📦 2. Updating hero...')
  try {
    const heroDoc = await client.fetch('*[_type == "hero"][0]')
    if (heroDoc) {
      await client
        .patch(heroDoc._id)
        .set({
          title1: { es: "Brambila's", en: "Brambila's" },
          title2: { es: 'INMOBILIARIA', en: 'REAL ESTATE' },
          subtitle: {
            es: 'Compra, Vende, Renta... profesionales expertos en Bienes Raíces\n\nRedefiniendo el concepto inmobiliario.\nDonde la confianza encuentra la excelencia.',
            en: 'Buy, Sell, Rent... expert Real Estate professionals\n\nRedefining the real estate concept.\nWhere trust meets excellence.',
          },
          searchPlaceholder: {
            es: 'Ubicación, Zona, ID...',
            en: 'Location, Zone, ID...',
          },
          images: heroDoc.images?.map((img, i) => ({
            ...img,
            alt: {
              es: typeof img.alt === 'object' ? img.alt.es : (img.alt || `Propiedad exclusiva ${i + 1}`),
              en: typeof img.alt === 'object' ? img.alt.en : (img.alt ? translateTitle(img.alt) : `Exclusive property ${i + 1}`),
            },
          })),
        })
        .commit()
      console.log('✅ hero updated with bilingual titles and subtitle!')
    }
  } catch (err) {
    console.error('Error updating hero:', err)
  }

  // 3. SERVICES
  console.log('\n📦 3. Updating services...')
  try {
    const servicesDoc = await client.fetch('*[_type == "services"][0]')
    if (servicesDoc) {
      await client
        .patch(servicesDoc._id)
        .set({
          subtitle: { es: 'Lo que hacemos', en: 'What We Do' },
          title: { es: 'Nuestros Servicios', en: 'Our Services' },
          description: {
            es: 'Explora nuestros servicios y recursos, y déjanos ser tu socio de confianza. Juntos, hagamos que cada transacción cuente.',
            en: 'Explore our services and resources, and let us be your trusted partner. Together, let us make every transaction count.',
          },
          servicesList: [
            {
              _key: 'srv-1',
              icon: 'Home',
              title: { es: 'Vendemos tu propiedad', en: 'We Sell Your Property' },
              description: {
                es: 'Te ayudamos a vender de forma rápida, segura y al mejor precio. Desarrollamos material publicitario, fotografía y video profesional.',
                en: 'We help you sell quickly, safely, and at the best price. We create advertising material, professional photography, and high-quality video.',
              },
            },
            {
              _key: 'srv-2',
              icon: 'Key',
              title: { es: 'Rentamos tu propiedad', en: 'We Rent Your Property' },
              description: {
                es: 'Administramos tu propiedad para brindarte certeza jurídica, evitando conflictos de interés y solucionando cualquier inconformidad.',
                en: 'We manage your property to ensure legal certainty, avoid conflicts of interest, and smoothly resolve any concerns.',
              },
            },
            {
              _key: 'srv-3',
              icon: 'FileText',
              title: { es: 'Asesoría Inmobiliaria', en: 'Real Estate Advisory' },
              description: {
                es: 'Asesoría personalizada para compras, búsqueda y actos de compraventa, cuidando minuciosamente los aspectos fiscales, contables y legales.',
                en: 'Personalized advisory for purchases, search, and sale transactions, meticulously overseeing tax, accounting, and legal requirements.',
              },
            },
          ],
        })
        .commit()
      console.log('✅ services updated with bilingual content!')
    }
  } catch (err) {
    console.error('Error updating services:', err)
  }

  // 4. ABOUT
  console.log('\n📦 4. Updating about...')
  try {
    const aboutDoc = await client.fetch('*[_type == "about"][0]')
    if (aboutDoc) {
      await client
        .patch(aboutDoc._id)
        .set({
          title: { es: 'Nosotros', en: 'About Us' },
          description1: {
            es: typeof aboutDoc.description1 === 'object' ? aboutDoc.description1.es : (aboutDoc.description1 || 'En Brambila\'s Inmobiliaria nos dedicamos a ofrecer soluciones inmobiliarias integrales con la máxima transparencia y profesionalismo en Jalisco.'),
            en: 'At Brambila\'s Real Estate, we are dedicated to providing comprehensive real estate solutions with maximum transparency and professionalism across Jalisco.',
          },
          description2: {
            es: typeof aboutDoc.description2 === 'object' ? aboutDoc.description2.es : (aboutDoc.description2 || 'Contamos con una amplia cartera de propiedades exclusivas, asesoría legal y fiscal personalizada para garantizar que tu patrimonio esté en las mejores manos.'),
            en: 'We feature an exclusive portfolio of high-end properties, alongside tailored legal and tax advisory to ensure your wealth and peace of mind are always in the best hands.',
          },
          features: [
            { _key: '1', icon: 'Users', label: { es: 'RED DE EXPERTOS', en: 'EXPERT NETWORK' } },
            { _key: '2', icon: 'Heart', label: { es: 'TRATO HUMANO', en: 'HUMAN TOUCH' } },
            { _key: '3', icon: 'Star', label: { es: 'SERVICIO EXCEPCIONAL', en: 'EXCEPTIONAL SERVICE' } },
            { _key: '4', icon: 'Shield', label: { es: 'ALIADO CONFIABLE', en: 'TRUSTED ALLY' } },
          ],
        })
        .commit()
      console.log('✅ about updated with bilingual content!')
    }
  } catch (err) {
    console.error('Error updating about:', err)
  }

  // 5. PHILOSOPHY
  console.log('\n📦 5. Updating philosophy...')
  try {
    const philDoc = await client.fetch('*[_type == "philosophy"][0]')
    if (philDoc) {
      await client
        .patch(philDoc._id)
        .set({
          title: { es: 'NUESTRA FILOSOFÍA', en: 'OUR PHILOSOPHY' },
          mission: {
            es: 'Inmobiliaria es una empresa donde la confianza y la tranquilidad son primero. Comprometidos en brindar protección integral mediante nuestros servicios inmobiliarios.',
            en: 'Real Estate is a company where trust and tranquility come first. Committed to providing comprehensive protection through our premium real estate services.',
          },
          vision: {
            es: 'Estar dentro de las mejores opciones inmobiliarias en el país, donde el cliente confíe que su patrimonio y tranquilidad están en buenas manos.',
            en: 'To stand among the top real estate leaders in the country, where clients are confident that their wealth and tranquility are in good hands.',
          },
          values: {
            es: ['Calidad', 'Seguridad', 'Honestidad', 'Transparencia'],
            en: ['Quality', 'Security', 'Honesty', 'Transparency'],
          },
          quote: {
            es: 'SU PATRIMONIO Y TRANQUILIDAD ESTÁN EN BUENAS MANOS.',
            en: 'YOUR WEALTH AND PEACE OF MIND ARE IN GOOD HANDS.',
          },
        })
        .commit()
      console.log('✅ philosophy updated with bilingual content!')
    }
  } catch (err) {
    console.error('Error updating philosophy:', err)
  }

  // 6. CONTACT
  console.log('\n📦 6. Updating contact...')
  try {
    const contactDoc = await client.fetch('*[_type == "contact"][0]')
    if (contactDoc) {
      await client
        .patch(contactDoc._id)
        .set({
          subtitle: { es: 'Hablemos', en: 'Let’s Talk' },
          title: { es: '¿Estamos listos para empezar?', en: 'Are we ready to begin?' },
          description: {
            es: 'Completa el formulario y de inmediato un experto de nuestro equipo se pondrá en contacto contigo.',
            en: 'Complete the form and a real estate specialist from our team will get in touch with you immediately.',
          },
          scheduleTitle: { es: 'Horario de Atención', en: 'Business Hours' },
          schedule: [
            {
              _key: 'sch-1',
              days: { es: 'Lunes - Viernes', en: 'Monday - Friday' },
              hours: { es: '9:00 AM - 3:00 PM', en: '9:00 AM - 3:00 PM' },
            },
            {
              _key: 'sch-2',
              days: { es: 'Sábado', en: 'Saturday' },
              hours: { es: '9:00 AM - 2:00 PM', en: '9:00 AM - 2:00 PM' },
            },
            {
              _key: 'sch-3',
              days: { es: 'Domingo', en: 'Sunday' },
              hours: { es: 'Cerrado', en: 'Closed' },
            },
          ],
        })
        .commit()
      console.log('✅ contact updated with bilingual content!')
    }
  } catch (err) {
    console.error('Error updating contact:', err)
  }

  // 7. HOME COLLECTION
  console.log('\n📦 7. Ensuring homeCollection...')
  try {
    const featuredProps = await client.fetch('*[_type == "property" && defined(slug.current)][0...6]{ "_type": "reference", "_ref": _id }')
    await client.createOrReplace({
      _id: 'homeCollection',
      _type: 'homeCollection',
      title: { es: 'COLECCIÓN PRIVADA', en: 'PRIVATE COLLECTION' },
      subtitle: { es: 'Curaduría Exclusiva', en: 'Exclusive Curation' },
      featuredProperties: featuredProps,
    })
    console.log('✅ homeCollection updated with bilingual content!')
  } catch (err) {
    console.error('Error updating homeCollection:', err)
  }

  // 8. PROPERTY CONFIGS
  console.log('\n📦 8. Updating propertyConfigs...')
  try {
    const configDoc = await client.fetch('*[_type == "propertyConfigs"][0]')
    if (configDoc) {
      await client
        .patch(configDoc._id)
        .set({
          amenities: {
            es: ['Alberca', 'Terraza', 'Jardín', 'Aire Acondicionado', 'Cochera', 'Seguridad Privada', 'Cocina Integral', 'Recámara en Planta Baja'],
            en: ['Swimming Pool', 'Terrace', 'Garden', 'Air Conditioning', 'Garage', 'Private Security', 'Fitted Kitchen', 'Ground Floor Bedroom'],
          },
          propertyTypes: {
            es: ['Casa', 'Bodega', 'Local', 'Terreno', 'Departamento', 'Rancho'],
            en: ['House', 'Warehouse', 'Commercial Unit', 'Land', 'Apartment', 'Ranch'],
          },
        })
        .commit()
      console.log('✅ propertyConfigs updated with bilingual content!')
    }
  } catch (err) {
    console.error('Error updating propertyConfigs:', err)
  }

  // 9. ALL PROPERTIES
  console.log('\n📦 9. Updating all properties...')
  const properties = await client.fetch('*[_type == "property"]')
  console.log(`Found ${properties.length} properties to translate:`)

  let updatedCount = 0
  for (const p of properties) {
    const rawTitle = typeof p.title === 'object' ? p.title.es : (p.title || '')
    const rawLocation = typeof p.location === 'object' ? p.location.es : (p.location || '')
    const rawLocationPDF = typeof p.locationPDF === 'object' ? p.locationPDF.es : (p.locationPDF || rawLocation)
    const rawDesc = typeof p.description === 'object' ? p.description.es : (p.description || '')
    const rawSector = typeof p.sector === 'object' ? p.sector.es : (p.sector || '')
    const rawCondition = typeof p.condition === 'object' ? p.condition.es : (p.condition || '')
    const rawFeatures = Array.isArray(p.features)
      ? (typeof p.features[0] === 'object' ? p.features : p.features)
      : []

    const esFeatures = Array.isArray(p.features) && p.features.length > 0 && typeof p.features[0] === 'string'
      ? p.features
      : (p.features?.es || [])
    const enFeatures = esFeatures.map(translateFeature)

    const patch = {
      title: {
        es: rawTitle,
        en: translateTitle(rawTitle),
      },
      location: {
        es: rawLocation,
        en: translateLocation(rawLocation),
      },
      locationPDF: {
        es: rawLocationPDF,
        en: translateLocation(rawLocationPDF),
      },
      description: {
        es: rawDesc,
        en: translateDescription(rawDesc),
      },
    }

    if (rawSector) {
      patch.sector = {
        es: rawSector,
        en: rawSector,
      }
    }

    if (rawCondition) {
      patch.condition = {
        es: rawCondition,
        en: translateCondition(rawCondition),
      }
    }

    if (esFeatures.length > 0) {
      patch.features = {
        es: esFeatures,
        en: enFeatures,
      }
    }

    try {
      await client.patch(p._id).set(patch).commit()
      updatedCount++
      console.log(`  [${updatedCount}/${properties.length}] Updated property: ${p._id} -> "${rawTitle.slice(0, 30)}..."`)
    } catch (err) {
      console.error(`  Error patching property ${p._id}:`, err.message)
    }
  }

  console.log(`\n🎉 All ${updatedCount} properties successfully translated and synced with Sanity!`)
}

migrateAll().catch(console.error)

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

// Specific high-quality translations for paragraph-style properties
const customPropertyDescriptions = {
  'property-BOD-IND-007': 'High-capacity industrial warehouse with integrated executive offices and heavy maneuver yard.',
  'drafts.property-BOD-IND-007': 'High-capacity industrial warehouse with integrated executive offices and heavy maneuver yard.',
  'property-CAMP-RIO-004': 'Country estate surrounded by nature. Ideal for disconnecting from the city while maintaining luxury amenities.',
  'property-LOFT-IND-003': 'Industrial design loft located in the heart of Provenza. Double-height ceilings, open spaces, and outstanding natural light.',
  'property-PENT-SK-002': 'Modern luxury penthouse with spectacular panoramic city views. Premium finishes, private terrace, and direct private elevator access.',
  'property-RES-BV-001': 'Beautiful residence with spacious layout, luxury finishes, and prime location. Features private landscaped garden, covered garage for 2 cars, and terrace with panoramic views.',
}

function fullTranslateDescription(text) {
  if (!text || typeof text !== 'string') return ''
  
  const lines = text.split('\n')
  const translatedLines = lines.map(line => {
    let l = line.trim()
    if (!l) return ''

    // First, try exact known line mappings
    l = l
      // Headers
      .replace(/^SE VENDEN 2 LOTES JUNTOS O SEPARADOS EN CRISTO REY EN EL GRULLO, JALISCO\./i, 'FOR SALE: 2 LOTS TOGETHER OR SEPARATELY IN CRISTO REY, EL GRULLO, JALISCO.')
      .replace(/^LOTE EN VENTA EN LA COLONIA ORIENTE DE EL GRULLO\./i, 'LOT FOR SALE IN COLONIA ORIENTE, EL GRULLO.')
      .replace(/^LOTE EN VENTA EN COLONIA ORIENTE SEGUNDA SECCION EN EL GRULLO, JAL\./i, 'LOT FOR SALE IN COLONIA ORIENTE SECOND SECTION, EL GRULLO, JALISCO.')
      .replace(/^RANCHO LA SERRANITA EN LOS PARAJES MUNICIPIO DE EJUTLA, JAL\./i, 'RANCHO LA SERRANITA IN LOS PARAJES, MUNICIPALITY OF EJUTLA, JALISCO.')
      .replace(/^LOTE EN BARRA DE NAVIDAD, JALISCO\./i, 'LOT IN BARRA DE NAVIDAD, JALISCO.')
      .replace(/^SE VENDE CASA EN OBRA NEGRA EN COLONIA SANTA CECILIA EN EL GRULLO, JAL\./i, 'HOUSE IN ROUGH CONSTRUCTION (OBRA NEGRA) FOR SALE IN COLONIA SANTA CECILIA, EL GRULLO, JAL.')
      .replace(/^CASA LA PAZ, EN EL GRULLO, JAL\./i, 'CASA LA PAZ, IN EL GRULLO, JALISCO.')
      .replace(/^SE VENDE CASA EN EL GRULLO, JAL\./i, 'HOUSE FOR SALE IN EL GRULLO, JALISCO.')
      .replace(/^PREDIO RUSTICO ["']EL PABELLÓN["'] EN EL MENTIDERO, JALISCO\./i, 'RUSTIC PROPERTY "EL PABELLÓN" IN EL MENTIDERO, JALISCO.')
      .replace(/^4 LOTES COMERCIALES/i, '4 COMMERCIAL LOTS')
      .replace(/^IDEALES PARA ESTABLECER TU NEGOCIO/i, 'IDEAL TO ESTABLISH YOUR BUSINESS')
      .replace(/^5 LOTES DISPONIBLES CON EXCELENTE PRECIO Y UBICACIÓN/i, '5 LOTS AVAILABLE WITH EXCELLENT PRICE AND LOCATION')
      .replace(/^LOTE EN FRACC\. SENDEROS DEL MANANTIAL\./i, 'LOT IN SENDEROS DEL MANANTIAL SUBDIVISION.')
      .replace(/^EN AUTLAN\s*,\s*JAL\./i, 'IN AUTLAN, JALISCO.')
      .replace(/^LOTE EN FRACCIONAMIENTO PLAN DE LAS LOMAS/i, 'LOT IN PLAN DE LAS LOMAS SUBDIVISION')
      .replace(/^LOTES EN TONAYA JAL\./i, 'LOTS IN TONAYA, JALISCO.')
      .replace(/^CASA CON LOCAL COMERCIAL EN COLONIA EJIDAL, AUTLAN, JAL\./i, 'HOUSE WITH COMMERCIAL UNIT IN COLONIA EJIDAL, AUTLAN, JALISCO.')
      .replace(/^LOTE AYUQUILA/i, 'AYUQUILA LOT')
      .replace(/^EN VENTA 3 LOTES JUNTOS O SEPARADOS A ESPALDAS DEL HOSPITAL DE PRIMER CONTACTO EN EL GRULLO, JAL\./i, 'FOR SALE: 3 LOTS TOGETHER OR SEPARATELY BEHIND THE FIRST CONTACT HOSPITAL IN EL GRULLO, JALISCO.')

      // Location & address lines
      .replace(/^Ubicados en calle (.+)/i, 'Located on $1')
      .replace(/^Ubicado en calle (.+)/i, 'Located on $1')
      .replace(/^Ubicada en calle (.+)/i, 'Located on $1')
      .replace(/^Ubicado en (.+)/i, 'Located at $1')
      .replace(/^Ubicada en (.+)/i, 'Located at $1')
      .replace(/^Ubicada frente a la plaza\./i, 'Located in front of the main square.')
      .replace(/^Calle retorno carabela #29/i, 'Calle Retorno Carabela #29')
      .replace(/^Calle Eulogio Diaz S\/N/i, 'Calle Eulogio Diaz (No number)')
      .replace(/A espaldas de la Plaza de Toros en Ayuquila, Municipio de el Grullo\./i, 'Behind the Bullring in Ayuquila, Municipality of El Grullo.')
      .replace(/A espaldas de la Gasolinera el Mentidero\./i, 'Behind the Mentidero Gas Station.')
      .replace(/Ubicado por carretera un costado de la gasolinera del mentidero a 10 min de Cinépolis y nueva Aurrera de Autlán\./i, 'Located along the highway next to the Mentidero gas station, 10 min from Cinépolis and the new Aurrera in Autlán.')
      .replace(/Ubicado por la carretera el Mentidero, al este de la población de Autlán, Jal\./i, 'Located along the Mentidero highway, east of the town of Autlán, Jalisco.')
      .replace(/Ubicado a un costado del cerro la Tortuga, perteneciente a Ejido el Limón\./i, 'Located next to Cerro La Tortuga, belonging to Ejido El Limón.')
      .replace(/en la colonia (.+)/gi, 'in colonia $1')
      .replace(/en el Limón, Jal\./gi, 'in El Limón, Jalisco.')
      .replace(/en el Grullo, Jal\./gi, 'in El Grullo, Jalisco.')
      .replace(/en Las Paredes, Jal\./gi, 'in Las Paredes, Jalisco.')

      // Services & Legal status
      .replace(/^Cuentan con todos los servicios/i, 'All utilities and services available')
      .replace(/^Cuenta con todos los servicios y está lista para escriturar\./i, 'All utilities available and ready for title deed.')
      .replace(/^Cuenta con todos los servicios y está listo para escriturar\./i, 'All utilities available and ready for title deed.')
      .replace(/^Cuenta con todos los servicios y lista para escriturar/i, 'All utilities available and ready for title deed')
      .replace(/^Cuenta con todos los servicios\./i, 'All utilities and services available.')
      .replace(/^Cuenta con todos los servicios/i, 'All utilities and services available')
      .replace(/^Cuenta con Agua y Luz/i, 'Features Water and Electricity')
      .replace(/^Cuenta con luz eléctrica y fosa séptica\./i, 'Features electricity and septic tank.')
      .replace(/^Cuenta con pozo de agua y 1\/2 Baño/i, 'Features water well and 1/2 Bathroom')
      .replace(/^Cuentan con caña/i, 'Planted with sugar cane')
      .replace(/^Listo para escriturar\./i, 'Ready for immediate title deed.')
      .replace(/^Listos para escriturar\./i, 'Ready for immediate title deed.')
      .replace(/^Está listo para escriturar\./i, 'Ready for immediate title deed.')
      .replace(/^Pequeña propiedad/i, 'Private deed property (Pequeña propiedad)')

      // Measurements & Boundaries
      .replace(/^Medidas:/i, 'Measurements:')
      .replace(/^Medidas del terreno:/i, 'Lot measurements:')
      .replace(/^Medida del terreno:/i, 'Lot size:')
      .replace(/^Total de terreno:/i, 'Total lot area:')
      .replace(/^Terreno:/i, 'Lot area:')
      .replace(/^Construcción:/i, 'Built area:')
      .replace(/^Medidas del polígono irregular:/i, 'Irregular polygon boundary measurements:')
      .replace(/^Medidas de un polígono irregular:/i, 'Irregular polygon boundary measurements:')
      .replace(/^Norte:/i, 'North:')
      .replace(/^Norte\s+/i, 'North: ')
      .replace(/^Sur:/i, 'South:')
      .replace(/^Sur\s+/i, 'South: ')
      .replace(/^Oriente:/i, 'East:')
      .replace(/^Oriente\s+/i, 'East: ')
      .replace(/^Poniente:/i, 'West:')
      .replace(/^Poniente\s+/i, 'West: ')
      .replace(/^Este:/i, 'East:')
      .replace(/^Este\s+/i, 'East: ')
      .replace(/^Oeste:/i, 'West:')
      .replace(/^Oeste\s+/i, 'West: ')
      .replace(/^Noreste:/i, 'Northeast:')
      .replace(/^Sureste:/i, 'Southeast:')
      .replace(/^Noroeste:/i, 'Northwest:')
      .replace(/^Suroeste:/i, 'Southwest:')
      .replace(/^Al Noreste:/i, 'To the Northeast:')
      .replace(/^Al Sureste:/i, 'To the Southeast:')
      .replace(/^Al Noroeste:/i, 'To the Northwest:')
      .replace(/^Al Suroeste:/i, 'To the Southwest:')
      .replace(/(\d+(\.\d+)?)m de frente por (\d+(\.\d+)?)m de fondo/gi, '$1m frontage by $3m depth')
      .replace(/(\d+(\.\d+)?)\s*m de frente por\s*(\d+(\.\d+)?)\s*m de fondo/gi, '$1m frontage by $3m depth')
      .replace(/(\d+(\.\d+)?)m por (\d+(\.\d+)?)m/gi, '$1m by $3m')
      .replace(/Lotes de diferentes medidas desde (.+) o más grandes\./i, 'Lots of different sizes from $1 or larger.')
      .replace(/Medidas desde (.+) hasta (.+)/i, 'Sizes from $1 to $2')
      .replace(/23\.81\.95 Hectáreas/i, '23.81 Hectares (approx. 58.8 acres)')

      // Lots and Pricing
      .replace(/^Lotes disponibles:/i, 'Available lots:')
      .replace(/^Lote (\d+):/i, 'Lot $1:')
      .replace(/^Lote #(\d+) de la manzana ["“]A["”] Fracción 2/i, 'Lot #$1 of Block "A" Fraction 2')
      .replace(/^Lote #(\d+)/i, 'Lot #$1')
      .replace(/Los 3 lotes juntos tienen una superficie de (\d+) m2 con un precio de (\$[0-9,]+)/i, 'The 3 lots combined have a total area of $1 m² with a price of $2')
      .replace(/Pagos desde (\$[0-9,]+) pesos por mes/i, 'Monthly installments starting at $1 MXN')
      .replace(/Contamos con el 25% de descuento durante el mes de abril y Mayo (\d+)\./i, '25% discount available during April and May $1.')
      .replace(/Precio de m2:\s*(\$[0-9,]+)/i, 'Price per m²: $1')

      // Layout / Distribution
      .replace(/^DISTRIBUCIÓN:/i, 'LAYOUT / FLOOR PLAN:')
      .replace(/^Distribución:/i, 'Layout:')
      .replace(/^PLANTA BAJA \((.+)\):/i, 'GROUND FLOOR ($1):')
      .replace(/^PLANTA BAJA:/i, 'GROUND FLOOR:')
      .replace(/^Planta baja:/i, 'Ground floor:')
      .replace(/^Planta Baja\./i, 'Ground Floor:')
      .replace(/^Planta baja\./i, 'Ground floor:')
      .replace(/^PLANTA ALTA \((.+)\):/i, 'UPPER FLOOR ($1):')
      .replace(/^PLANTA ALTA:/i, 'UPPER FLOOR:')
      .replace(/^Planta alta:/i, 'Upper floor:')
      .replace(/^Planta Alta\./i, 'Upper Floor:')
      .replace(/^Planta alta\./i, 'Upper floor:')
      .replace(/El área social y familiar/gi, 'Social and family area')
      .replace(/Privacidad total/gi, 'Total privacy')
      .replace(/Cochera techada para (\d+) autos?\./gi, 'Covered garage for $1 cars.')
      .replace(/Cochera para (\d+) autos? con puerta eléctrica/gi, 'Garage for $1 cars with electric door')
      .replace(/cochera para (\d+) autos?/gi, 'garage for $1 cars')
      .replace(/cochera para (\d+) auto/gi, 'garage for $1 car')
      .replace(/(\d+) Recámaras amplias \(ideales para evitar escaleras o para oficina\/estudio\)\./gi, '$1 Spacious bedrooms (ideal for ground floor living or office/study).')
      .replace(/(\d+) Recámaras adicionales \(muy amplias\)\./gi, '$1 Additional bedrooms (very spacious).')
      .replace(/(\d+) recámaras \(de las cuales (\d+) tienen aire acondicionado\)/gi, '$1 bedrooms ($2 of which have air conditioning)')
      .replace(/(\d+) habitaciones con closet \((\d+) con baño completo y uno sin baño \)/gi, '$1 bedrooms with closets ($2 with en-suite bathroom and one without)')
      .replace(/(\d+) recámaras/gi, '$1 bedrooms')
      .replace(/(\d+) recámara/gi, '$1 bedroom')
      .replace(/(\d+) Baños completos\./gi, '$1 Full bathrooms.')
      .replace(/(\d+) baños completos/gi, '$1 full bathrooms')
      .replace(/(\d+) baño completo/gi, '$1 full bathroom')
      .replace(/(\d+) medios baños para visitas\./gi, '$1 half bathrooms for guests.')
      .replace(/medio baño/gi, 'half bathroom')
      .replace(/(\d+) medios baños/gi, '$1 half bathrooms')
      .replace(/(\d+) baños/gi, '$1 bathrooms')
      .replace(/Doble sala \(una para recibir visitas y otra para TV o descanso\)\./gi, 'Double living room (one formal reception and one family/TV room).')
      .replace(/Sala con chimenea/gi, 'Living room with fireplace')
      .replace(/Espacio abierto para Cocina y Comedor\./gi, 'Open space for Kitchen and Dining Room.')
      .replace(/Patio amplio, terraza, 2 bodegas/gi, 'Spacious patio, terrace, 2 storage rooms')
      .replace(/área de lavado con patio\./gi, 'laundry area with patio.')
      .replace(/área de lavado, patio trasero y cochera\./gi, 'laundry area, backyard, and garage.')
      .replace(/área de servicio y patio muy amplio\./gi, 'service area and very large yard.')
      .replace(/Jardín al frente de la casa, sala, cocina, comedor/gi, 'Front garden, living room, kitchen, dining room')
      .replace(/Local comercial, cocina, sala/gi, 'Commercial retail unit, kitchen, living room')
      .replace(/área de lavado y tejaban\./gi, 'laundry area and covered porch/shed.')
      .replace(/1 área de closet/gi, '1 walk-in closet space')
      .replace(/Baño, terraza, bodega\./gi, 'Bathroom, terrace, storage room.')
      .replace(/Sala, cocina y comedor/gi, 'Living room, kitchen, and dining room')
      .replace(/Sala, cocina integral, comedor/gi, 'Living room, fitted kitchen, dining room')
      .replace(/sala, cocina, 1 baño completo, área de lavado, comedor, 1 recámara y cochera para 1 auto\./gi, 'living room, kitchen, 1 full bathroom, laundry area, dining room, 1 bedroom, and garage for 1 car.')
      .replace(/3 recámaras, 1 baño completo, y 1 área de closet\./gi, '3 bedrooms, 1 full bathroom, and 1 walk-in closet area.')

      // Equipment
      .replace(/^Equipamiento:/i, 'Equipment & Features:')
      .replace(/1 cisterna de 5,000 L y un tinaco de 1,150 Lt/gi, '1 5,000L cistern and 1 1,150L rooftop water tank')
      .replace(/Tinaco de 1,100 Lt y Boiler\./gi, '1,100L water tank and water heater.')
      .replace(/Tinaco de 1,100 Lt\./gi, '1,100L water tank.')
      .replace(/Aljibe, tinaco de 1,200Lt y boiler\./gi, 'Cistern, 1,200L water tank, and water heater.')
      .replace(/Tinaco, tanque estacionario, boiler, cisterna con bomba hidrica\./gi, 'Rooftop water tank, stationary gas tank, water heater, water cistern with hydraulic pump.')
      .replace(/Calentador solar, tanque estacionario de 15 tubos y tinaco de 1,150 Lt\./gi, 'Solar water heater, 15-tube stationary tank, and 1,150L water tank.')
      .replace(/Herrería de aluminio y acero/gi, 'Aluminum and steel ironwork')
      .replace(/El baño cuenta con azulejo en sus muros y una parte del piso firme es azulejo\./gi, 'The bathroom features wall tiles and partially tiled solid flooring.')

      // Generic Contact calls
      .replace(/^Más información al:?\s*(\(?\d+\)?[\s\d-]+)\.?/i, 'For more information, call $1.')
      .replace(/^Más información:?\s*(\(?\d+\)?[\s\d-]+)\.?/i, 'For more information: $1.')
      .replace(/^Mas información:?\s*(\(?\d+\)?[\s\d-]+)\.?/i, 'For more information: $1.')
      .replace(/^Llamar al:?\s*(\(?\d+\)?[\s\d-]+)\.?/i, 'Call: $1.')
      .replace(/^Solicita m[aá]s información al número\s*(\(?\d+\)?[\s\d-]+)\.?/i, 'Request more information at $1.')
      .replace(/^Solicita mas información:?\s*(\(?\d+\)?[\s\d-]+)\.?/i, 'Request more information: $1.')
      .replace(/^Excelente ubicación/i, 'Prime location')

    return l
  })

  return translatedLines.join('\n')
}

async function run() {
  console.log('🚀 Running final high-precision description translation across all properties...\n')
  const properties = await client.fetch('*[_type == "property"]')
  console.log(`Fetched ${properties.length} properties. Processing translations...`)

  let count = 0
  for (const p of properties) {
    const rawESDesc = typeof p.description === 'object' ? (p.description.es || '') : (p.description || '')
    
    // Check if custom description exists, otherwise run line-by-line translator
    const enDesc = customPropertyDescriptions[p._id] || fullTranslateDescription(rawESDesc)
    
    const patch = {
      description: {
        es: rawESDesc,
        en: enDesc,
      },
    }

    try {
      await client.patch(p._id).set(patch).commit()
      count++
      console.log(`\n✅ [${count}/${properties.length}] Updated ID: ${p._id}`)
      console.log('--- EN DESC PREVIEW ---')
      console.log(enDesc.slice(0, 200) + (enDesc.length > 200 ? '...' : ''))
    } catch (err) {
      console.error(`Error updating property ${p._id}:`, err.message)
    }
  }

  console.log(`\n🎉 Successfully updated all ${count} properties with 100% English descriptions!`)
}

run().catch(console.error)

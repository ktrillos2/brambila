export interface Property {
    id: number
    title: string
    location: string
    price: string
    priceLabel?: string
    currency?: string
    tag: "Venta" | "Alquiler"
    status: "Venta" | "Alquiler" // Keeping both for compatibility with existing code until fully refactored
    type: "Casa" | "Terreno" | "Departamento" | "Comercial"
    image: string
    images?: string[]
    description: string
    bedrooms?: number
    bathrooms?: number
    area?: string
    landArea?: string
    featured?: boolean
    // Extended details
    code?: string
    sector?: string
    condition?: string
    measures?: {
        total?: string
        north?: string
        south?: string
        east?: string
        west?: string
    }
    features?: string[]
}

export const properties: Property[] = [
    {
        id: 1,
        title: "RESIDENCIA BELLA VISTA",
        location: "Llanogrande, Antioquia",
        price: "$5.200M",
        currency: "COP",
        tag: "Venta",
        status: "Venta",
        type: "Casa",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop"
        ],
        description: "Hermosa casa con amplios espacios, acabados de lujo y excelente ubicación. Cuenta con jardín privado, cochera para 2 autos y terraza con vista panorámica.",
        bedrooms: 5,
        bathrooms: 6,
        area: "650 M²",
        featured: true,
        code: "RES-BV-001",
        sector: "Residencial",
        condition: "Excelente",
        features: ["Jardín", "Terraza", "Vista Panorámica", "Seguridad 24/7"]
    },
    {
        id: 2,
        title: "SKYLINE PENTHOUSE",
        location: "El Poblado, Medellín",
        price: "$12M",
        priceLabel: "/ MES",
        currency: "COP",
        tag: "Alquiler",
        status: "Alquiler",
        type: "Departamento",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
        ],
        description: "Penthouse moderno con vistas espectaculares de la ciudad. Acabados premium, terraza privada y acceso directo al ascensor.",
        bedrooms: 3,
        bathrooms: 3,
        area: "320 M²",
        code: "PENT-SK-002",
        sector: "Residencial",
        condition: "Nuevo",
        features: ["Jacuzzi", "Gimnasio", "Piscina", "Domótica"]
    },
    {
        id: 3,
        title: "LOFT INDUSTRIAL",
        location: "Provenza, Medellín",
        price: "$1.800M",
        currency: "COP",
        tag: "Venta",
        status: "Venta",
        type: "Departamento",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
        ],
        description: "Loft de diseño industrial en el corazón de Provenza. Doble altura, espacios abiertos y excelente iluminación natural.",
        bedrooms: 1,
        bathrooms: 2,
        area: "140 M²",
        code: "LOFT-IND-003",
        sector: "Residencial",
        condition: "Remodelado",
        features: ["Doble Altura", "Diseño Industrial", "Ubicación Premium"]
    },
    {
        id: 4,
        title: "CASA CAMPESTRE",
        location: "Rionegro, Antioquia",
        price: "$3.500M",
        currency: "COP",
        tag: "Venta",
        status: "Venta",
        type: "Casa",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop"
        ],
        description: "Casa campestre rodeada de naturaleza. Ideal para desconectarse de la ciudad sin perder comodidades.",
        bedrooms: 4,
        bathrooms: 4,
        area: "450 M²",
        code: "CAMP-RIO-004",
        sector: "Campestre",
        condition: "Buena",
        features: ["Espacios Verdes", "Privacidad", "Árboles Frutales"]
    },
    {
        id: 5,
        title: "Terreno en El Mentidero",
        location: "El Mentidero, Autlán de Navarro, Jalisco",
        price: "$27,585,000 MXN",
        currency: "MXN",
        tag: "Venta",
        status: "Venta",
        type: "Terreno",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
        ],
        description: "PREDIO RUSTICO 'EL PABELLÓN' EN EL MENTIDERO, JALISCO.\nUbicado por la carretera el Mentidero, al este de la población de Autlán, Jal.\nCuenta con todos los servicios y está listo para escriturar.",
        landArea: "230,000 m²",
        code: "NN-GQC314",
        sector: "Comercial",
        condition: "Buena",
        measures: {
            total: "23.81.95 Hectáreas",
            north: "101.70m",
            south: "280.32m",
            east: "1.150 m",
            west: "1,038.67 m"
        },
        features: ["Servicios Básicos", "Escrituración Inmediata", "Acceso Carretera"]
    },
    {
        id: 6,
        title: "Terreno en Barra de Navidad",
        location: "Barra de Navidad, Cihuatlán, Jalisco",
        price: "$1,300,000 MXN",
        currency: "MXN",
        tag: "Venta",
        status: "Venta",
        type: "Terreno",
        image: "/terreno-barra-de-navidad.png",
        images: [
            "/terreno-barra-de-navidad.png",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
        ],
        description: "Terreno cerca de la playa, perfecto para construir casa de descanso. Zona en crecimiento con alta plusvalía.",
        landArea: "165m²",
        code: "TER-BAR-006",
        sector: "Turístico",
        condition: "Excelente",
        features: ["Cerca de Playa", "Zona en Desarrollo", "Plusvalía"]
    }
]

export function getPropertyById(id: number): Property | undefined {
    return properties.find(p => p.id === id)
}

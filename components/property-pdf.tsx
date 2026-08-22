/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer"
import { formatPrice } from "@/lib/utils"
import { Language } from "@/context/language-context"
import { translations } from "@/lib/translations"

// Register font
Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
})

Font.register({
    family: "Roboto-Bold",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
})

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 0,
        fontFamily: "Roboto",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        padding: 20,
        color: "#ffffff",
    },
    companyInfo: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    companyName: {
        fontSize: 12,
        fontFamily: "Roboto-Bold",
        color: "#D4AF37",
        textTransform: "uppercase",
        marginBottom: 3,
    },
    companyDetails: {
        fontSize: 8,
        color: "#cccccc",
        marginBottom: 1,
    },
    content: {
        padding: 20,
    },
    mainImage: {
        width: "100%",
        height: 250,
        objectFit: "cover",
        marginBottom: 15,
    },
    titleSection: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
        paddingBottom: 10,
    },
    tag: {
        fontSize: 9,
        color: "#D4AF37",
        textTransform: "uppercase",
        marginBottom: 5,
        fontFamily: "Roboto-Bold",
        letterSpacing: 1,
    },
    title: {
        fontSize: 22,
        fontFamily: "Roboto-Bold",
        color: "#1a1a1a",
        textTransform: "uppercase",
        marginBottom: 5,
        lineHeight: 1.1,
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    location: {
        fontSize: 10,
        color: "#1a1a1a",
        marginLeft: 0,
    },
    price: {
        fontSize: 18,
        fontFamily: "Roboto-Bold",
        color: "#D4AF37",
        marginTop: 5,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 4,
    },
    gridItem: {
        width: "33.33%",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: 8,
        paddingHorizontal: 2,
    },
    gridLabel: {
        fontSize: 7,
        color: "#888",
        textTransform: "uppercase",
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    gridValue: {
        fontSize: 10,
        fontFamily: "Roboto-Bold",
        color: "#333",
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: "Roboto-Bold",
        color: "#1a1a1a",
        textTransform: "uppercase",
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: "#D4AF37",
        paddingLeft: 8,
    },
    description: {
        fontSize: 9,
        color: "#444",
        lineHeight: 1.4,
        textAlign: "justify",
    },
    features: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    featureItem: {
        width: "33.33%",
        fontSize: 8,
        color: "#555",
        marginBottom: 4,
        flexDirection: "row",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#f5f5f5",
        padding: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#e5e5e5",
    },
    footerContent: {
        flex: 1,
    },
    footerText: {
        fontSize: 8,
        color: "#888",
        marginBottom: 2,
    },
    qrContainer: {
        width: 60,
        height: 60,
        marginLeft: 15,
        backgroundColor: "white",
        padding: 4,
    },
    brandName: {
        fontSize: 18,
        fontFamily: "Roboto-Bold",
        letterSpacing: 1,
    },
    logo: {
        width: 100,
        height: 40,
        objectFit: "contain",
    },
})

type Property = {
    id: string
    title: string
    location: string
    locationPDF?: string
    price: string
    currency?: string
    tag: string
    image: string
    description?: string
    bedrooms?: number
    bathrooms?: number
    halfBathrooms?: number
    area?: string
    landArea?: string
    levels?: number
    features?: string[]
    slug?: string
    latitude?: number
    longitude?: number
}

type GlobalConfig = {
    email?: string
    phone?: string
    address?: string
    siteName?: string
    whatsapp?: string
    logo?: string
}

export const PropertyPDF = ({
    property,
    qrCodeUrl,
    globalConfig,
    language = "es"
}: {
    property: Property
    qrCodeUrl: string
    globalConfig?: GlobalConfig
    language?: Language
}) => {
    const t = translations[language]
    const formattedFeatures = property.features?.slice(0, 9) || []

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Visual Header */}
                <View style={styles.header}>
                    <View>
                        {globalConfig?.logo ? (
                            <Image style={styles.logo} src={globalConfig.logo} />
                        ) : (
                            <View>
                                <Text style={styles.brandName}>BRAMBILA'S</Text>
                                <Text style={{ fontSize: 9, letterSpacing: 3, color: "#aaa" }}>
                                    {language === "en" ? "REAL ESTATE" : "INMOBILIARIA"}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.companyInfo}>
                        <Text style={styles.companyName}>{t.pdf.contact}</Text>
                        <Text style={styles.companyDetails}>{globalConfig?.phone || "523330366666"}</Text>
                        <Text style={styles.companyDetails}>{globalConfig?.email || "contacto@brambilasinmobiliaria.com"}</Text>
                        <Text style={styles.companyDetails}>www.brambilasinmobiliaria.com</Text>
                    </View>
                </View>

                {/* Main Image */}
                {property.image && <Image style={styles.mainImage} src={property.image} />}

                <View style={styles.content}>
                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <Text style={styles.tag}>{property.tag}</Text>
                        <Text style={styles.title}>{property.title}</Text>

                        <View style={styles.locationContainer}>
                            <Text style={styles.location}>{property.locationPDF || property.location}</Text>
                        </View>

                        <Text style={styles.price}>{formatPrice(property.price, property.currency)}</Text>
                    </View>

                    {/* Specs Grid */}
                    <View style={styles.grid}>
                        {property.bedrooms !== undefined && (
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t.pdf.specs.bedrooms}</Text>
                                <Text style={styles.gridValue}>{property.bedrooms}</Text>
                            </View>
                        )}
                        {property.bathrooms !== undefined && (
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t.pdf.specs.bathrooms}</Text>
                                <Text style={styles.gridValue}>{property.bathrooms}</Text>
                            </View>
                        )}
                        {property.halfBathrooms !== undefined && (
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t.pdf.specs.halfBathrooms}</Text>
                                <Text style={styles.gridValue}>{property.halfBathrooms}</Text>
                            </View>
                        )}
                        {property.area && (
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t.pdf.specs.construction}</Text>
                                <Text style={styles.gridValue}>{property.area}</Text>
                            </View>
                        )}
                        {property.landArea && (
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t.pdf.specs.land}</Text>
                                <Text style={styles.gridValue}>{property.landArea}</Text>
                            </View>
                        )}
                        {property.levels !== undefined && property.levels > 0 && (
                            <View style={styles.gridItem}>
                                <Text style={styles.gridLabel}>{t.pdf.specs.levels}</Text>
                                <Text style={styles.gridValue}>{property.levels}</Text>
                            </View>
                        )}
                    </View>

                    {/* Description */}
                    {property.description && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t.pdf.description}</Text>
                            <Text style={styles.description}>
                                {property.description.length > 450
                                    ? `${property.description.substring(0, 450)}...`
                                    : property.description}
                            </Text>
                        </View>
                    )}

                    {/* Features */}
                    {formattedFeatures.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t.pdf.amenities}</Text>
                            <View style={styles.features}>
                                {formattedFeatures.map((feature, i) => (
                                    <Text key={i} style={styles.featureItem}>• {feature}</Text>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.footerContent}>
                        <Text style={{ ...styles.footerText, fontFamily: "Roboto-Bold", color: "#333", fontSize: 9 }}>
                            {t.pdf.interestedTitle}
                        </Text>
                        <Text style={styles.footerText}>
                            {t.pdf.scanQrText}
                        </Text>
                        <Text style={{ ...styles.footerText, marginTop: 2 }}>
                            {new Date().toLocaleDateString(language === "en" ? "en-US" : "es-MX")}
                        </Text>
                    </View>
                    {qrCodeUrl && (
                        <Image style={styles.qrContainer} src={qrCodeUrl} />
                    )}
                </View>
            </Page>
        </Document>
    )
}

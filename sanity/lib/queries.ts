import { groq } from "next-sanity";

export const GLOBAL_CONFIG_QUERY = groq`*[_type == "globalConfig"][0]{
  siteName,
  "logo": logo.asset->url,
  "logoFooter": logoFooter.asset->url,
  email,
  phone,
  whatsapp,
  address,
  footerText,
  socialLinks[]{
    platform,
    url
  },
  headerMenu[]{
    label,
    href
  },
  footerMenu[]{
    label,
    href
  },
  legalMenu[]{
    label,
    href
  }
}`;

export const HERO_QUERY = groq`*[_type == "hero"][0]{
  title1,
  title2,
  subtitle,
  searchPlaceholder,
  images[]{
    "image": image.asset->url,
    alt
  }
}`;

export const HOME_COLLECTION_QUERY = groq`*[_type == "homeCollection"][0]{
  title,
  subtitle,
  featuredProperties[]->{
  "id": _id, 
    "slug": slug.current,
    title,
    location,
    price,
    currency,
    tag,
    "image": mainImage.asset->url,
    bedrooms,
    bathrooms,
    halfBathrooms,
    area,
    levels
  }
}`;

export const SERVICES_QUERY = groq`*[_type == "services"][0]{
  subtitle,
  title,
  description,
  servicesList[]{
    icon,
    title,
    description
  }
}`;

export const CONTACT_QUERY = groq`{
  "contact": *[_type == "contact"][0],
  "global": *[_type == "globalConfig"][0]{
    phone,
    email,
    address
  }
}`;

export const ALL_PROPERTIES_QUERY = groq`*[_type == "property" && defined(slug.current)]{
  "id": _id,
  title,
  "slug": slug.current,
  location,
  price,
  currency,
  tag,
  status,
  type,
  "image": mainImage.asset->url,
  bedrooms,
  bathrooms,
  halfBathrooms,
  area,
  landArea,
  levels,
  featured
}`;

export const PROPERTY_BY_SLUG_QUERY = groq`*[_type == "property" && slug.current == $slug][0]{
  "id": _id,
  title,
  "slug": slug.current,
  location,
  locationPDF,
  price,
  currency,
  tag,
  status,
  type,
  "image": mainImage.asset->url,
  "images": gallery[].asset->url,
  video, 
  "videoUrl": video.asset->url,
  description,
  bedrooms,
  bathrooms,
  halfBathrooms,
  area,
  landArea,
  levels,
  code,
  sector,
  condition,
  features,

  latitude,
  longitude,
  "measures": {
    "total": area,
    "north": "",
    "south": "",
    "east": "",
    "west": ""
  }
}`;

export const PROPERTY_CONFIGS_QUERY = groq`*[_type == "propertyConfigs"][0]{
  locations,
  propertyTypes,
  amenities
}`;

export const ABOUT_QUERY = groq`*[_type == "about"][0]{
  title,
  description1,
  description2,
  features[]{
    label,
    icon
  },
  "image": image.asset->url
}`;

export const PHILOSOPHY_QUERY = groq`*[_type == "philosophy"][0]{
  title,
  mission,
  vision,
  values,
  quote,
  "image": image.asset->url
}`;

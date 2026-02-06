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
  }
}`;

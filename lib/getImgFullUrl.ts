export const getImageFullUrl_server = (image) => process.env.STRAPI_BASE_URL + image?.attributes?.url;
export const getImageFullUrl_client = (image) => process.env.NEXT_PUBLIC_STRAPI_BASE_URL + image?.attributes?.url;

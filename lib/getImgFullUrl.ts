export const getImageFullUrl = (image) => process.env.NEXT_PUBLIC_STRAPI_BASE_URL + image?.attributes?.url;

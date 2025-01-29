export const getImageFullUrl_server = (image) => {
  if (image) return process.env.STRAPI_BASE_URL + image?.attributes?.url;
  return '';
};
export const getImageFullUrl_client = (image) => {
  if (image) return process.env.NEXT_PUBLIC_STRAPI_BASE_URL + image?.attributes?.url;
  return '';
};

export const getVideoFullUrl_client = (url) => {
  if (url) return process.env.NEXT_PUBLIC_STRAPI_BASE_URL + url;
  return '';
}

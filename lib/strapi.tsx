import qs from 'qs';

const { STRAPI_BASE_URL, STRAPI_API_TOKEN } = process.env;

const headersList = {
  Accept: '*/*',
  Authorization: 'Bearer ' + STRAPI_API_TOKEN,
};

type Pages = 'index' | 'about' | 'contact';

export const getPageData = async (page: Pages) => {
  const url = `${STRAPI_BASE_URL}/api/${page}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: headersList,
  });
  const data = await response.json();
  return data;
};

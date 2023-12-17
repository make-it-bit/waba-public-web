import qs from 'qs';

const { STRAPI_BASE_URL, STRAPI_API_TOKEN } = process.env;

const headers = {
  Accept: '*/*',
  Authorization: 'Bearer ' + STRAPI_API_TOKEN,
};

type Pages = 'index' | 'science-behind';

export const getPageData = async (page: Pages) => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/${page}?${query}`;
  const response = await fetch(url, {
    method: 'GET',
    headers,
  });
  const { data } = await response.json();
  return data;
};

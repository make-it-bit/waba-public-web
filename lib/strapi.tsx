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
    cache: 'no-store',
  });
  const { data } = await response.json();
  return data;
};

type Faq = {
  category: string;
  question: string;
  answer: string;
};

export const getFaqs = async (): Promise<null | Faq[]> => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/faqs?${query}`;
  const response = await fetch(url, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  const data = await response.json();
  const responseData = data.data as any[];
  if (responseData.length === 0) return null;
  return responseData;
};

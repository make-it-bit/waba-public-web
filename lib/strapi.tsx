import qs from 'qs';

const { STRAPI_BASE_URL, STRAPI_API_TOKEN } = process.env;

const headers = {
  Accept: '*/*',
  Authorization: 'Bearer ' + STRAPI_API_TOKEN,
};

type Component = 'promobar' | 'navbar' | 'cta-block' | 'pre-footer-card' | 'footer';

export const getLayoutData = async (component: Component) => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/${component}?${query}`;
  const response = await fetch(url, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch layout data.');
  const { data } = await response.json();
  return data;
};

type Pages = 'index' | 'product' | 'science-behind' | 'results' | 'about-us' | 'faq';

export const getPageData = async (page: Pages) => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/${page}?${query}`;
  const response = await fetch(url, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch page data');
  const { data } = await response.json();
  return data;
};

type PageLink = {
  href_text: string;
  href_src: string;
};

export const getPageLinks = async (): Promise<null | PageLink[]> => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/page-links?${query}`;
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

export const getImageFullUrl = (image) => {
  try {
    return STRAPI_BASE_URL + image.attributes.url;
  } catch (error) {
    console.error('Image not found.');
  }
};

/* type Faq = {
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
}; */

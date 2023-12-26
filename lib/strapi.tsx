import qs from 'qs';

const { STRAPI_BASE_URL, STRAPI_API_TOKEN } = process.env;

const headers = {
  Accept: '*/*',
  Authorization: 'Bearer ' + STRAPI_API_TOKEN,
};

const footerNestedComponents = [
  'footer_top.input_button',
  'page_links.page_link_data',
  'social_media_links.icon',
  'shipping_policy',
  'privacy_policy',
];

const populateComponent = {
  promobar: '*',
  navbar: '*',
  'cta-block': '*',
  'pre-footer-card': '*',
  footer: footerNestedComponents,
};

type Component = 'promobar' | 'navbar' | 'cta-block' | 'pre-footer-card' | 'footer';

export const getComponentData = async (component: Component) => {
  const query = qs.stringify({ populate: populateComponent[component] });
  const url = `${STRAPI_BASE_URL}/api/${component}?${query}`;
  const response = await fetch(url, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch component data.');
  const { data } = await response.json();
  return data;
};

const indexPageNestedComponents = [
  'hero.button_1',
  'hero.button_2',
  'hero.tags',
  'hero.tags.logo',
  'color.device_head_blue',
  'color.device_head_red',
  'color.device_head_infrared',
  'foundation.foundation_card_1',
  'foundation.foundation_card_1.icon',
  'foundation.foundation_card_2',
  'foundation.foundation_card_2.icon',
  'foundation.foundation_card_3',
  'foundation.foundation_card_3.icon',
  'foundation.button',
  'peek_inside',
  'testimonial.user_stories.image',
  'testimonial.user_stories.button',
];

type Pages = 'index' | 'product' | 'science-behind' | 'results' | 'about-us' | 'faq';

const populatePage = {
  index: indexPageNestedComponents,
  product: '*',
  'science-behind': '*',
  results: '*',
  'about-us': '*',
  faq: '*',
};

export const getPageData = async (page: Pages) => {
  const query = qs.stringify({ populate: populatePage[page] });
  const url = `${STRAPI_BASE_URL}/api/${page}?${query}`;
  const response = await fetch(url, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch page data.');
  const { data } = await response.json();
  return data;
};

export const getImageFullUrl = (image) => {
  try {
    return STRAPI_BASE_URL + image.attributes.url;
  } catch (error) {
    console.error('Image not found.');
  }
};

/* type PageLink = {
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

type Tag = {
  logo: any;
  text: string;
};

export const getTags = async (): Promise<null | Tag[]> => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/tags?${query}`;
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

type SocialMediaLink = {
  name: string;
  href: string;
  target: string;
  icon: any;
};

export const getSocialMediaLinks = async (): Promise<null | SocialMediaLink[]> => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/social-media-links?${query}`;
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
}; */

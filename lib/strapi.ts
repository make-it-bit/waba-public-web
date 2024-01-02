import qs from 'qs';

const { STRAPI_BASE_URL, STRAPI_API_TOKEN } = process.env;

const headers = {
  Accept: '*/*',
  Authorization: 'Bearer ' + STRAPI_API_TOKEN,
};

const navbarNestedComponents = [
  'waba_logos',
  'menu_icons',
  'leftside_links.page_link_data',
  'rightside_links.page_link_data',
  'button',
];

const preFooterCardNestedComponents = [
  'pre_footer_card_1.background_image',
  'pre_footer_card_1.button',
  'pre_footer_card_2.background_image',
  'pre_footer_card_2.button',
];

const footerNestedComponents = [
  'footer_top.input_button',
  'page_links.page_link_data',
  'social_media_links.icon',
  'shipping_policy',
  'privacy_policy',
];

const populateComponent = {
  promobar: '*',
  navbar: navbarNestedComponents,
  'cta-block': '*',
  'pre-footer-card': preFooterCardNestedComponents,
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
  'hero.tags.logo',
  'color.device_head_blue',
  'color.device_head_red',
  'color.device_head_infrared',
  'foundation.foundation_card_1.icon',
  'foundation.foundation_card_1.background_image',
  'foundation.foundation_card_2.icon',
  'foundation.foundation_card_2.background_image',
  'foundation.foundation_card_3.icon',
  'foundation.foundation_card_3.background_image',
  'foundation.button',
  'peek_inside',
  'testimonial.user_stories.image',
  'testimonial.user_stories.button',
];

const productPageNestedComponents = [
  'hero.images',
  'hero.tags.logo',
  'hero.button_1',
  'hero.button_2',
  'hero.powered_by_logos',
  'product_info.feature_cards.icon',
  'product_info.photobiomodulation.image',
  'product_info.included',
  'product_info.stories.image',
  'product_info.stories.button',
  'product_info.stories.result_image',
  'product_info.specifications',
  'warranty.background_image',
  'warranty.icon',
  'faq.faq_elements',
];

const sciencePageNestedComponents = [
  'hero',
  'skin.skins.image',
  'photobiomodulation.image',
  'wavelength',
  'beam',
  'text_image.image',
  'warranty',
];

const resultPageNestedComponents = ['hero', 'example.examples.image', 'testimonial.user_stories.image', 'warranty'];

const aboutPageNestedComponents = [
  'hero.background_image',
  'origin',
  'text_image_1.image',
  'sustainability',
  'text_image_2.image',
  'trust.reason_1.icon',
  'trust.reason_2.icon',
  'trust.reason_3.icon',
  'trust.reason_4.icon',
  'difference.button',
];

const careersBusinessPageNestedComponents = ['hero_background_image', 'form.button'];

type Pages =
  | 'index'
  | 'product'
  | 'science-behind'
  | 'result'
  | 'about-us'
  | 'faq'
  | 'careers-at-waba'
  | 'waba-for-business';

const populatePage = {
  index: indexPageNestedComponents,
  product: productPageNestedComponents,
  'science-behind': sciencePageNestedComponents,
  result: resultPageNestedComponents,
  'about-us': aboutPageNestedComponents,
  faq: '*',
  'careers-at-waba': careersBusinessPageNestedComponents,
  'waba-for-business': careersBusinessPageNestedComponents,
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

export const getImageFullUrl = (image) => process.env.NEXT_PUBLIC_STRAPI_BASE_URL + image?.attributes?.url;

type FaqElement = {
  category: string;
  title: string;
  description: string;
};

export const getFaqElements = async (): Promise<null | FaqElement[]> => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/faq-elements?${query}`;
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

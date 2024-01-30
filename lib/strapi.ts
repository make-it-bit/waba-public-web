import { revalidateTag } from 'next/cache';
import qs from 'qs';
import { redirect } from 'next/navigation';

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
  'footer_top.icon',
  'footer_top.input_button',
  'page_links.page_link_data',
  'social_media_links.icon',
  'terms',
  'returns',
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
  revalidateTag(component);
  const response = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: [component] },
  });
  if (!response.ok) throw new Error('Failed to fetch component data.');
  const { data } = await response.json();
  return data;
};

const indexPageNestedComponents = [
  'seo',
  'hero.button_1',
  'hero.button_2',
  'hero.tags.logo',
  'hero.background_video',
  'color.device_head_blue.light_image',
  'color.device_head_blue.head_image',
  'color.device_head_red.light_image',
  'color.device_head_red.head_image',
  'color.device_head_infrared.light_image',
  'color.device_head_infrared.head_image',
  'color.device_green_light',
  'color.device_body',
  'foundation.foundation_card_1.icon',
  'foundation.foundation_card_1.background_image',
  'foundation.foundation_card_2.icon',
  'foundation.foundation_card_2.background_image',
  'foundation.foundation_card_3.icon',
  'foundation.foundation_card_3.background_image',
  'foundation.button',
  'peek_inside.desktop_images',
  'peek_inside.mobile_images',
  'testimonial.user_stories.image',
  'testimonial.user_stories.button',
];

const productPageNestedComponents = [
  'seo',
  'hero.images.image',
  'hero.tags.logo',
  'hero.button_1',
  'hero.button_2',
  'hero.powered_by_logos',
  'product_info.feature_cards.icon',
  'product_info.photobiomodulation.image',
  'product_info.photobiomodulation.background_video',
  'product_info.included',
  'product_info.included_image',
  'product_info.stories.image',
  'product_info.stories.button',
  'product_info.stories.result_image',
  'product_info.specifications',
  'warranty.background_image',
  'warranty.icon',
  'faq.faq_elements',
];

const sciencePageNestedComponents = [
  'seo',
  'hero.background_video',
  'skin.skins.image',
  'photobiomodulation.image',
  'wavelength.wavelength_images',
  'beam.beam_video',
  'beam.beam_image',
  'beam.device_images',
  'text_image.image',
  'text_image.animation_image',
  'warranty.quote_author',
  'warranty.quote_text',
  'warranty.quote_image',
];

const resultPageNestedComponents = [
  'seo',
  'hero.background_media',
  'example.examples.image',
  'testimonial.user_stories.image',
  'warranty.video',
];

const aboutPageNestedComponents = [
  'seo',
  'hero.background_image',
  'origin.device_image',
  'text_image_1.image',
  'sustainability.background_video',
  'text_image_2.image',
  'trust.reason_1.icon',
  'trust.reason_2.icon',
  'trust.reason_3.icon',
  'trust.reason_4.icon',
  'difference.button',
  'difference.device_image',
];

const faqPageNestedComponents = ['seo', 'hero_title', 'faq_elements'];

const careersBusinessPageNestedComponents = ['seo', 'hero_background_image', 'form.button'];

type Pages =
  | 'index'
  | 'product'
  | 'science-behind'
  | 'result'
  | 'about-us'
  | 'faq'
  | 'careers-at-waba'
  | 'waba-for-business'
  | 'term'
  | 'return'
  | 'shipping-policy'
  | 'privacy-policy';

const populatePage = {
  index: indexPageNestedComponents,
  product: productPageNestedComponents,
  'science-behind': sciencePageNestedComponents,
  result: resultPageNestedComponents,
  'about-us': aboutPageNestedComponents,
  faq: faqPageNestedComponents,
  'careers-at-waba': careersBusinessPageNestedComponents,
  'waba-for-business': careersBusinessPageNestedComponents,
  term: '*',
  return: '*',
  'shipping-policy': '*',
  'privacy-policy': '*',
};

export const getPageData = async (page: Pages) => {
  const query = qs.stringify({ populate: populatePage[page] });
  const url = `${STRAPI_BASE_URL}/api/${page}?${query}`;
  revalidateTag(page);
  const response = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: [page] },
  });
  if (!response.ok) {
    console.log('Failed to fetch page data.');
    redirect('/404');
  }
  const { data } = await response.json();
  return data;
};

type FaqElement = {
  category: string;
  title: string;
  description: string;
};

export const getFaqElements = async (): Promise<null | FaqElement[]> => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/faq-elements?${query}`;
  revalidateTag('faqElements');
  const response = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['faqElements'] },
  });
  const data = await response.json();
  const responseData = data.data as any[];
  if (responseData.length === 0) return null;
  return responseData;
};

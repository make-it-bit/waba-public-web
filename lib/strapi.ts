import { revalidateTag } from 'next/cache';
import qs from 'qs';
import { redirect } from 'next/navigation';
import { Logger } from 'next-axiom';

const { STRAPI_BASE_URL, STRAPI_API_TOKEN } = process.env;

const headers = {
  Accept: '*/*',
  Authorization: 'Bearer ' + STRAPI_API_TOKEN,
};

const log = new Logger();

const navbarNestedComponents = [
  'waba_logos',
  'menu_icons',
  'leftside_links.page_link_data',
  'rightside_links.page_link_data',
  'button',
];

const offersContentNestedComponents = [
  'seo.title',
  'seo.description',
  'content.bg_image',
  'content.file',
  'form.fields',
  'form.terms_label',
  'form',
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
  'terms_policies_links.page_link_data',
];

const populateComponent = {
  promobar: '*',
  navbar: navbarNestedComponents,
  'cta-block': '*',
  'pre-footer-card': preFooterCardNestedComponents,
  footer: footerNestedComponents,
  'cookie-consent': '*',
  offers: offersContentNestedComponents,
};

type Component = 'promobar' | 'navbar' | 'cta-block' | 'pre-footer-card' | 'footer' | 'cookie-consent';

type CollectionName = 'offers';

export const getComponentData = async (component: Component) => {
  const query = qs.stringify({ populate: populateComponent[component] });
  const url = `${STRAPI_BASE_URL}/api/${component}?${query}`;
  revalidateTag(component);
  const response = await fetch(url, { method: 'GET', headers, next: { tags: [component] } });
  if (!response.ok) throw new Error('Failed to fetch component data.');
  const { data } = await response.json();
  log.info('Successfully fetched component data.', { component: component });
  await log.flush();

  return data;
};

export const getCollectionSlugs = async (collectionName: CollectionName, url = null) => {
  const items = await getCollectionData(collectionName);
  if (url) {
    return items.map((item) => `/${url}/${item.attributes.slug}`);
  } else {
    return items.map((item) => `/${item.attributes.slug}`);
  }
};

export const getCollectionItem = async (collectionName: CollectionName, slug: string) => {
  const items = await getCollectionData(collectionName);
  const slugItem = items.find((item: any) => item.attributes.slug === slug);
  if (!slugItem) return null;
  return slugItem.attributes;
};

export const getCollectionData = async (collectionName: CollectionName) => {
  const query = qs.stringify({ populate: populateComponent[collectionName] });

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/${collectionName}?${query}`, {
      headers,
    });
    if (!response.ok) throw new Error(`Failed to fetch ${collectionName} data`);

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const indexPageNestedComponents = [
  'seo',
  'hero.button_1',
  'hero.button_2',
  'hero.tags.logo',
  'hero.background_video',
  'hero.background_video_first_frame',
  'new_era',
  'new_era.new_era_list',
  'compare_index',
  'compare_index.compare_cards',
  'compare_index.compare_cards.title',
  'compare_index.compare_cards.description',
  'compare_index.compare_cards.before',
  'compare_index.compare_cards.after',
  'waba_users',
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
  'testimonial.foundation_card_1.icon',
  'testimonial.foundation_card_1.background_image',
  'testimonial.foundation_card_2.icon',
  'testimonial.foundation_card_2.background_image',
  'testimonial.foundation_card_3.icon',
  'testimonial.foundation_card_3.background_image',
  'testimonial.button',
];
const productPageNestedComponents = [
  'seo',
  'quote_bar',
  'quote_bar.person_image',
  'backed_science',
  'transformation',
  'transformation.before',
  'transformation.during',
  'transformation.after',
  'transformation.mobile_before',
  'transformation.mobile_during',
  'transformation.mobile_after',
  'hero.images.image',
  'hero.mobile_images.image',
  'hero.tags.logo',
  'hero.button_1',
  'hero.button_2',
  'hero.powered_by_logos',
  'hero.new_price.country',
  'hero.new_price.price',
  'product_info.feature_cards.icon',
  'product_info.photobiomodulation.image',
  'product_info.photobiomodulation.background_video',
  'product_info.included',
  'product_info.included_image',
  'product_info.stories.image',
  'product_info.stories.button',
  'product_info.stories.result_image',
  'product_info.specifications',
  'product_info.compare_title',
  'warranty.background_image',
  'warranty.icon',
  'faq.faq_elements',
];
const sciencePageNestedComponents = [
  'seo',
  'hero.background_video',
  'verified_science',
  'electromagnetic',
  'electromagnetic.image',
  'problem_solution',
  'problem_solution.image',
  'skin.skins.image',
  'photobiomodulation.image',
  'wavelength.wavelength_images',
  'beam.beam_video',
  'beam.beam_image',
  'beam.device_images',
  'text_image.image',
  'text_image.second_image',
  'text_image.references',
  'text_image.animation_images',
  'warranty.quote_author',
  'warranty.quote_text',
  'warranty.quote_image',
];
const userStoriesPageNestedComponents = [
  'seo',
  'hero.background_media',
  'example.examples.image',
  'testimonial.user_stories.image',
  'warranty.video',
  'ig_block',
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
const blogPageNestedComponents = [
  'seo',
  'hero.featured_blog_post',
  'hero.featured_blog_post.image',
  'hero.featured_blog_post.categories',
  'blog_categories',
  'input_button',
  'socials_tags.logo',
];
const formPagesNestedComponents = ['seo', 'hero_background_image', 'form.button'];

type Pages =
  | 'index'
  | 'product'
  | 'science-behind'
  | 'result'
  | 'about-us'
  | 'faq'
  | 'blog'
  | 'careers-at-waba'
  | 'waba-for-business'
  | 'contact-us'
  | 'term'
  | 'return'
  | 'shipping-policy'
  | 'privacy-policy';

const populatePage = {
  index: indexPageNestedComponents,
  product: productPageNestedComponents,
  'science-behind': sciencePageNestedComponents,
  result: userStoriesPageNestedComponents,
  'about-us': aboutPageNestedComponents,
  faq: faqPageNestedComponents,
  blog: blogPageNestedComponents,
  'careers-at-waba': formPagesNestedComponents,
  'waba-for-business': formPagesNestedComponents,
  'contact-us': formPagesNestedComponents,
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

  log.info('Successfully fetched page data.', { page: page });
  await log.flush();

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

  log.info('Successfully fetched FAQ elements.');
  await log.flush();

  return responseData;
};

type SEO = {
  title: string;
  description: string;
  og_image: Object;
};

type BlogCategory = {
  name: string;
};

type BlogPost = {
  id: number;
  attributes: {
    seo: SEO;
    slug: string;
    image: Object;
    title: string;
    description: string;
    author: string;
    date: string;
    content: string;
    categories: BlogCategory[];
    back_to_blog: {
      href_text: string;
      href_src: string;
    };
  };
};

export const getBlogPosts = async (limit: number = 3): Promise<null | BlogPost[]> => {
  const query = qs.stringify({ 
    populate: '*', 
    pagination: { limit }
  });
  const url = `${STRAPI_BASE_URL}/api/blog-posts?${query}`;
  revalidateTag('blogPosts');
  const response = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['blogPosts'] },
  });
  const data = await response.json();
  const responseData = data.data as any[];
  if (responseData.length === 0) return null;
  responseData.sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());

  log.info('Successfully fetched blog posts.');
  await log.flush();

  return responseData;
};

export const getCompareSection = async (limit: number = 6): Promise<null | any[]> => {
  const query = qs.stringify({ 
    populate: 'compare_card.after,compare_card.before',
    pagination: { limit }
  });
  const url = `${STRAPI_BASE_URL}/api/compare-sections?${query}`;
  revalidateTag('compareCards');
  const response = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['compareCards'] },
  });
  const data = await response.json();
  const responseData = data.data as any[];
  if (responseData.length === 0) return null;

  log.info('Successfully fetched compare cards.');
  await log.flush();

  return responseData;
};

export const getUserVideos = async (limit: number = 6): Promise<null | any[]> => {
  const query = qs.stringify({ 
    populate: '*',
    pagination: { limit }
  });
  const url = `${STRAPI_BASE_URL}/api/user-videos?${query}`;
  revalidateTag('userVideos');
  const response = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['userVideos'] },
  });
  const data = await response.json();
  const responseData = data.data as any[];
  if (responseData.length === 0) return null;

  log.info('Successfully fetched user videos.');
  await log.flush();

  return responseData;
};

export const getScienceArticles = async (limit: number = 6): Promise<null | any[]> => {
  const query = qs.stringify({ 
    populate: '*',
    pagination: { limit }
  });
  const url = `${STRAPI_BASE_URL}/api/science-articles?${query}`;
  revalidateTag('scienceArticles');
  const response = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['scienceArticles'] },
  });
  const data = await response.json();
  const responseData = data.data as any[];
  if (responseData.length === 0) return null;

  log.info('Successfully fetched science articles.');
  await log.flush();

  return responseData;
};

type PolicyPage = {
  id: number;
  attributes: {
    seo: SEO;
    slug: string;
    content: string;
  };
};

export const getPolicyPages = async (): Promise<null | PolicyPage[]> => {
  const query = qs.stringify({ populate: '*' });
  const url = `${STRAPI_BASE_URL}/api/policy-pages?${query}`;
  revalidateTag('policyPages');
  const response = await fetch(url, {
    method: 'GET',
    headers,
    next: { tags: ['policyPages'] },
  });
  const data = await response.json();
  const responseData = data.data as any[];
  if (responseData.length === 0) return null;

  log.info('Successfully fetched policy pages.');
  await log.flush();

  return responseData;
};

export interface OrderData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  amount: number;
}

export const createOrder = async (orderData: OrderData) => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/orders`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: orderData
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.log('response not ok!');
      throw new Error(`Failed to create order in Strapi: ${JSON.stringify(responseData)}`);
    }

    // Return a success response that matches what the frontend expects
    return {
      success: true,
      data: responseData.data
    };
  } catch (error) {
    console.error('Error creating order:', error);
    log.error('Error creating order in Strapi', { error });
    await log.flush();
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order'
    };
  }
};

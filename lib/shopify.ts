import { gql, GraphQLClient } from 'graphql-request';

const { SHOPIFY_STOREFRONT_API_DOMAIN, SHOPIFY_STOREFRONT_API_TOKEN } = process.env;

if (!SHOPIFY_STOREFRONT_API_DOMAIN || !SHOPIFY_STOREFRONT_API_TOKEN) {
  throw new Error('Missing Shopify env variables');
}

const graphQLClient = new GraphQLClient(SHOPIFY_STOREFRONT_API_DOMAIN, {
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
  },
});

export const getProductById = async (id: string): Promise<any> => {
  try {
    const QUERY = gql`
      query getProductById($id: ID!) {
        product(id: $id) {
          # https://shopify.dev/docs/api/storefront/2023-10/objects/Product#fields
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    `;
    return await graphQLClient.request(QUERY, { id });
  } catch (error) {
    console.log('error: ', error);
  }
};

interface LineItem {
  variantId: string;
  quantity: number;
}

interface CheckoutCreateInput {
  lineItems: LineItem[];
}

interface CheckoutResponse {
  id: string;
  webUrl: string;
}

interface CheckoutUserError {
  code: string;
  field: string;
  message: string;
}

interface CheckoutCreateResponse {
  checkoutCreate: {
    checkout: CheckoutResponse;
    checkoutUserErrors: CheckoutUserError[];
  };
}

export const createCheckout = async (lineItems: LineItem[]): Promise<CheckoutCreateResponse> => {
  try {
    const QUERY = gql`
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }
    `;
    const input: CheckoutCreateInput = { lineItems };
    const response = await graphQLClient.request<CheckoutCreateResponse>(QUERY, { input });
    return response;
  } catch (error) {
    console.log('error: ', error);
    throw error; // Re-throw the error for upstream error handling
  }
};

export function flattenNewPrice(new_price: { data: any[] }) {
  return (new_price?.data || []).map(item => ({
    country: item.attributes.country,
    price: item.attributes.price,
  }));
} 
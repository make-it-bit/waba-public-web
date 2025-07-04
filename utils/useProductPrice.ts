import { useCurrencyStore } from '@/page-components/Navbar/currencyStore';

export type PriceEntry = { country: string; price: number };

export function useProductPrice(flatNewPrice: PriceEntry[], fallbackPrice: number | string) {
  const { currency } = useCurrencyStore();
  return flatNewPrice.find(p => p.country === currency)?.price || fallbackPrice;
}

export function useProductPriceCurrency(flatNewPrice: PriceEntry[]) {
  const { currency } = useCurrencyStore();
  return flatNewPrice.find(p => p.country === currency)?.country;
}
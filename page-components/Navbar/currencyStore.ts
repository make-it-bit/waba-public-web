import { create } from 'zustand';

export type Currency = 'EUR' | 'AED';

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

// Todo: add dynamic currency default from strapi
export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: 'AED',
  setCurrency: (currency) => set({ currency }),
}));
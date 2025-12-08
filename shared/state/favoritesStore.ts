import {create} from 'zustand';

export interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface FavoritesState {
  favorites: FavoriteProduct[];
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: FavoriteProduct) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: (product: FavoriteProduct) =>
    set(state => ({
      favorites: [...state.favorites.filter((f: FavoriteProduct) => f.id !== product.id), product],
    })),
  removeFavorite: (productId: string) =>
    set(state => ({
      favorites: state.favorites.filter((f: FavoriteProduct) => f.id !== productId),
    })),
  toggleFavorite: (product: FavoriteProduct) =>
    set(state => {
      const exists = state.favorites.some((f: FavoriteProduct) => f.id === product.id);
      if (exists) {
        return {favorites: state.favorites.filter((f: FavoriteProduct) => f.id !== product.id)};
      }
      return {favorites: [...state.favorites, product]};
    }),
  isFavorite: (productId: string) => {
    const state = get();
    return state.favorites.some((f: FavoriteProduct) => f.id === productId);
  },
}));

import {create} from 'zustand';

export type Product = {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  categoryEn: string;
  description: string;
  descriptionEn: string;
  dimensions: string[];
  colors: string[];
  material?: string;
  materialEn?: string;
};

interface ProductsState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'ארון אמבטיה מודרני',
    nameEn: 'Modern Bathroom Vanity',
    price: 3500,
    image: 'https://via.placeholder.com/400x300?text=Vanity+1',
    images: [
      'https://via.placeholder.com/400x300?text=Vanity+1',
      'https://via.placeholder.com/400x300?text=Vanity+1+Side',
      'https://via.placeholder.com/400x300?text=Vanity+1+Detail',
    ],
    category: 'ארונות על רגליים',
    categoryEn: 'Vanities on Legs',
    description: 'ארון אמבטיה מעוצב בסגנון מודרני עם מגירות מרווחות',
    descriptionEn: 'Modern designed bathroom vanity with spacious drawers',
    dimensions: ['60 ס״מ', '80 ס״מ', '100 ס״מ', '120 ס״מ', 'מותאם אישית'],
    colors: ['לבן', 'אפור', 'שחור'],
    material: 'עץ מלא',
    materialEn: 'Solid Wood',
  },
  {
    id: '2',
    name: 'ארון תלוי קלאסי',
    nameEn: 'Classic Wall-Mounted Vanity',
    price: 2800,
    image: 'https://via.placeholder.com/400x300?text=Vanity+2',
    images: [
      'https://via.placeholder.com/400x300?text=Vanity+2',
      'https://via.placeholder.com/400x300?text=Vanity+2+Side',
    ],
    category: 'ארונות תלויים',
    categoryEn: 'Wall-Mounted Vanities',
    description: 'ארון תלוי אלגנטי עם מראה מודרני',
    descriptionEn: 'Elegant wall-mounted vanity with modern mirror',
    dimensions: ['60 ס״מ', '80 ס״מ', '100 ס״מ', 'מותאם אישית'],
    colors: ['לבן', 'קרם'],
    material: 'MDF',
    materialEn: 'MDF',
  },
  {
    id: '3',
    name: 'ארון עץ טבעי',
    nameEn: 'Natural Wood Vanity',
    price: 4200,
    image: 'https://via.placeholder.com/400x300?text=Vanity+3',
    images: [
      'https://via.placeholder.com/400x300?text=Vanity+3',
      'https://via.placeholder.com/400x300?text=Vanity+3+Detail',
    ],
    category: 'עץ טבעי',
    categoryEn: 'Natural Wood',
    description: 'ארון אמבטיה מעץ טבעי עם גימור איכותי',
    descriptionEn: 'Natural wood bathroom vanity with quality finish',
    dimensions: ['80 ס״מ', '100 ס״מ', '120 ס״מ', 'מותאם אישית'],
    colors: ['עץ טבעי', 'עץ כהה'],
    material: 'עץ מלא',
    materialEn: 'Solid Wood',
  },
  {
    id: '4',
    name: 'כיור מודרני',
    nameEn: 'Modern Sink',
    price: 1200,
    image: 'https://via.placeholder.com/400x300?text=Sink+1',
    images: ['https://via.placeholder.com/400x300?text=Sink+1'],
    category: 'כיורים',
    categoryEn: 'Sinks',
    description: 'כיור מעוצב בסגנון מינימליסטי',
    descriptionEn: 'Minimalist designed sink',
    dimensions: ['60 ס״מ', '80 ס״מ', 'מותאם אישית'],
    colors: ['לבן', 'שחור'],
    material: 'חרסינה',
    materialEn: 'Porcelain',
  },
];

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: mockProducts,
  setProducts: (products: Product[]) => set({products}),
  getProductById: (id: string): Product | undefined => {
    const state = get();
    return state.products.find((p: Product) => p.id === id);
  },
  getProductsByCategory: (category: string): Product[] => {
    const state = get();
    return state.products.filter(
      (p: Product) => p.category === category || p.categoryEn === category,
    );
  },
}));

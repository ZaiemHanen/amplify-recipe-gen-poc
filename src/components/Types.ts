export interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    expirationDate: string;
    category: string;
  }
  
  export type NewIngredient = Omit<Ingredient, 'id'>;
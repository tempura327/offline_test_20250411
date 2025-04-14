export type FoodType = {
  id: 'ft_pizza' | 'ft_iceCream' | 'ft_beverage';
  name: string;
};

export type Food = {
  id: string;
  type: string;
  name: string;
  price: number;
};

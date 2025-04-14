import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

export interface Food {
  id: string;
  type: string;
  name: string;
  price: number;
}

type UpdateFoodParams = Food;

// TODO:測試用，之後從mock data撈資料再刪掉
const initialState: Food[] = [
  { id: 'f_001', type: 'ft_pizza', name: '瑪格莉特披薩', price: 180 },
  { id: 'f_002', type: 'ft_pizza', name: '夏威夷披薩', price: 120 },
  { id: 'f_003', type: 'ft_pizza', name: '燻雞披薩', price: 150 },
  { id: 'f_004', type: 'ft_pizza', name: '三倍起司披薩', price: 150 },
  { id: 'f_005', type: 'ft_pizza', name: '墨西哥披薩', price: 250 },
  { id: 'f_006', type: 'ft_pizza', name: '醬烤鮮菇披薩', price: 200 },
  { id: 'f_007', type: 'ft_iceCream', name: '鮮奶霜淇淋', price: 35 },
  { id: 'f_008', type: 'ft_iceCream', name: '紅茶霜淇淋', price: 50 },
  { id: 'f_009', type: 'ft_iceCream', name: '咖啡霜淇淋', price: 50 },
  { id: 'f_010', type: 'ft_beverage', name: '紅茶', price: 20 },
  { id: 'f_011', type: 'ft_beverage', name: '綠茶', price: 20 },
  { id: 'f_012', type: 'ft_beverage', name: '奶茶', price: 30 },
  { id: 'f_013', type: 'ft_beverage', name: '烏龍茶', price: 30 },
  { id: 'f_014', type: 'ft_beverage', name: '可樂(2L)', price: 100 },
  { id: 'f_015', type: 'ft_beverage', name: '柳橙汁', price: 40 },
  { id: 'f_016', type: 'ft_beverage', name: '雪碧(2L)', price: 100 },
];

const foodMenuSlice = createSlice({
  name: 'foodMenu',
  initialState: initialState,
  reducers: {
    addMenuItem(state, action: PayloadAction<Food>) {
      state.push(action.payload);
    },
    updateMenuItem(state, action: PayloadAction<UpdateFoodParams>) {
      const { id, name, type, price } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.name = name;
        existingPost.type = type;
        existingPost.price = price;
      }
    },
    refreshMenu(state, action: PayloadAction<Food[]>) {
      state = [];

      state.push(...action.payload);
    },
  },
});

export const { addMenuItem, updateMenuItem, refreshMenu } =
  foodMenuSlice.actions;

export default foodMenuSlice.reducer;

export const selectMenuItemById = (state: RootState, itemId: string) =>
  state.foodMenu.find((food) => food.id === itemId);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SelectedFood } from '@/utils/type';

type RemoveFoodParams = {
  id: string;
};

type UpdateFoodNumberParams = {
  id: string;
  newNumber: number;
};

const initialState: SelectedFood[] = [];

const selectedFoodsSlice = createSlice({
  name: 'selectedFoods',
  initialState: initialState,
  reducers: {
    addSelectedFood(state, action: PayloadAction<SelectedFood>) {
      state.push(action.payload);
    },
    updateSelectedFoodNumber(
      state,
      action: PayloadAction<UpdateFoodNumberParams>,
    ) {
      const { id, newNumber } = action.payload;

      return state.map((food) => {
        if (food.id === id) {
          return {
            ...food,
            number: newNumber,
          };
        }

        return food;
      });
    },
    removeSelectedFood(state, action: PayloadAction<RemoveFoodParams>) {
      const { id } = action.payload;

      return state.filter((food) => {
        return food.id !== id;
      });
    },
    setSelectedFoods(state, action: PayloadAction<SelectedFood[]>) {
      const newState = action.payload.reduce<SelectedFood[]>(
        (res, { id, number, ...rest }) => {
          const isFoodAlreadyInState = !!res.find((food) => food.id === id);

          if (!isFoodAlreadyInState) {
            return [...res, { id, number, ...rest }];
          }

          return res.map((food) => {
            if (food.id === id) {
              return { ...food, number: food.number + number };
            }

            return food;
          });
        },
        state,
      );

      return newState;
    },
    resetSelectedFoods() {
      return [];
    },
  },
});

export const {
  addSelectedFood,
  updateSelectedFoodNumber,
  removeSelectedFood,
  setSelectedFoods,
  resetSelectedFoods,
} = selectedFoodsSlice.actions;

export default selectedFoodsSlice.reducer;

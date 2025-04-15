import { beforeEach, describe, expect, test } from 'vitest';

import {
  addSelectedFood,
  updateSelectedFoodNumber,
  removeSelectedFood,
  setSelectedFoods,
  resetSelectedFoods,
} from '../src/stores/selectedFoodsSlice';
import store from '../src/stores';

describe('test selectedFoodsSlice', () => {
  const dispatch = store.dispatch;

  const selectedFoods = [
    {
      id: 'id001',
      type: 'dessert',
      name: 'chocolate cake',
      price: 100,
      number: 2,
    },
    {
      id: 'id002',
      type: 'dessert',
      name: 'strawberry cake',
      price: 100,
      number: 1,
    },
  ];

  beforeEach(() => {
    dispatch(resetSelectedFoods());
  });

  test('if add a item to store.selectedFoods, its should contain one element', () => {
    dispatch(addSelectedFood(selectedFoods[0]));

    const data = store.getState().selectedFoods;

    expect(data).length(1);
    expect(data[0]).equal(selectedFoods[0]);
  });

  test('if send 100 to update number of selectedFood, number of the element should be 100', () => {
    dispatch(addSelectedFood(selectedFoods[0]));

    dispatch(
      updateSelectedFoodNumber({
        id: selectedFoods[0].id,
        newNumber: 3,
      }),
    );

    const data = store.getState().selectedFoods;

    expect(data).length(1);
    expect(data[0].number).equal(3);
  });

  test('if pass id of food to removeSelectedFood, the item which its id is the save should be removed', () => {
    dispatch(addSelectedFood(selectedFoods[0]));

    dispatch(
      removeSelectedFood({
        id: selectedFoods[0].id,
      }),
    );

    expect(store.getState().selectedFoods).length(0);
  });

  test('if add 2 items to store.selectedFoods, it should contains 2 element2', () => {
    dispatch(setSelectedFoods(selectedFoods));

    const data = store.getState().selectedFoods;

    expect(data).length(2);
    expect(data).deep.equals(selectedFoods);
  });

  test('if call resetSelectedFoods, store.selectedFoods should not contain any element', () => {
    dispatch(setSelectedFoods(selectedFoods));
    dispatch(resetSelectedFoods());

    expect(store.getState().selectedFoods).length(0);
  });
});

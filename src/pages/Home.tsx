import { useMemo, ReactNode, useCallback } from 'react';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import IcecreamIcon from '@mui/icons-material/Icecream';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';

import Drawer from '../components/Drawer';
import Counter from '../components/Counter';
import { useAppMutation, useAppQuery } from '../hooks/api';
import { FoodType, Food } from '../utils/type';
import { DAY_MILISECOND } from '../utils/constant';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import {
  addSelectedFood,
  updateSelectedFoodNumber,
  removeSelectedFood,
  resetSelectedFoods,
} from '../stores/selectedFoodsSlice';
import { HTTPMethod } from '../utils/request';

type DrawerItem = {
  text: string;
  icon?: ReactNode;
  actions?: () => void;
  childrenItems?: DrawerItem[];
};

const getSubDrawerItem = (text: string, action: (data: Food) => void) => {
  return {
    text,
    action,
  };
};

const iconMap = {
  ft_pizza: <LocalPizzaIcon />,
  ft_iceCream: <IcecreamIcon />,
  ft_beverage: <EmojiFoodBeverageIcon />,
};

const Home = () => {
  const selectedFoods = useAppSelector((state) => state.selectedFoods);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    if (selectedFoods.length < 1) return 0;

    return selectedFoods.reduce((acc, { price, number }) => {
      return acc + price * number;
    }, 0);
  }, [selectedFoods]);

  const { data: foodTypesData } = useAppQuery<FoodType[]>({
    url: '/foodTypes',
    queryOption: {
      staleTime: DAY_MILISECOND,
    },
  });

  const { data: foodsData } = useAppQuery<Food[]>({
    url: '/foods',
    queryOption: {
      staleTime: DAY_MILISECOND,
    },
  });

  const { mutate: updateHistoryMuatate } = useAppMutation({
    url: '/orderHistory',
    method: HTTPMethod.Post,
    mutateOption: {
      onSuccess: () => {
        alert('成功送出訂單');
      },
      onError: () => {
        alert('送出訂單失敗');
      },
    },
  });

  const drawerList = useMemo(() => {
    if (!foodTypesData) return [];

    const result = foodTypesData.reduce<DrawerItem[]>((res, currentType) => {
      const targetFoods =
        foodsData?.filter(({ type }) => type === currentType.id) || [];

      const childrenItems = targetFoods.map((food) => {
        const data = getSubDrawerItem(food.name, () => {
          const isFoodSelected = !!selectedFoods.find(
            ({ id }) => id === food.id,
          );

          if (!isFoodSelected) {
            dispatch(
              addSelectedFood({
                ...food,
                number: 1,
              }),
            );
          }
        });

        const isSelected = !!selectedFoods.find(({ id }) => id === food.id);

        return {
          ...data,
          icon: isSelected ? <CheckIcon /> : null,
        };
      });

      return [
        ...res,
        {
          text: currentType.name,
          icon: currentType.id in iconMap ? iconMap[currentType.id] : null,
          childrenItems: childrenItems,
        },
      ];
    }, []);

    return result;
  }, [dispatch, foodTypesData, foodsData, selectedFoods]);

  const handleUpdateSelectedFoods = useCallback(
    (targetData: Food, newValue: number) => {
      const { id: targetId } = targetData;
      const isTargetFoodSelcted = !!selectedFoods.find(
        ({ id }) => id === targetId,
      );

      if (!isTargetFoodSelcted) {
        const payload = addSelectedFood({
          ...targetData,
          number: newValue,
        });

        dispatch(payload);

        return;
      }

      const payload =
        newValue > 0
          ? updateSelectedFoodNumber({
              id: targetId,
              newNumber: newValue,
            })
          : removeSelectedFood({
              id: targetId,
            });

      dispatch(payload);
    },
    [dispatch, selectedFoods],
  );

  const handleSubmitOrder = useCallback(() => {
    updateHistoryMuatate({
      content: selectedFoods,
      timeStamp: Date.now(),
    });

    dispatch(resetSelectedFoods());
  }, [dispatch, selectedFoods, updateHistoryMuatate]);

  return (
    <div className="flex h-full">
      <Drawer listData={drawerList} />

      <div className="flex-1 p-8">
        <div className="flex justify-between">
          <Typography variant="h4">購物車</Typography>

          <Button
            variant="contained"
            disabled={selectedFoods.length < 1}
            onClick={handleSubmitOrder}
          >
            送出
          </Button>
        </div>
        <div className="my-4">
          {selectedFoods.map((food) => {
            const { id, name, number } = food;

            return (
              <div className="flex items-center [&>*+*]:ml-2" key={id}>
                <Typography className="text-left">{name}</Typography>
                <Counter
                  value={number}
                  onValueUpdate={(newValue) => {
                    handleUpdateSelectedFoods(food, newValue);
                  }}
                />

                <IconButton
                  onClick={() => {
                    handleUpdateSelectedFoods(food, 0);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          })}
        </div>
        <hr className="my-4" />
        <div className="flex">總計: {totalPrice.toLocaleString()} 元</div>
      </div>
    </div>
  );
};

export default Home;

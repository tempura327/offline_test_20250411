import { useState, useMemo, ReactNode } from 'react';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import IcecreamIcon from '@mui/icons-material/Icecream';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import Drawer from '../components/Drawer';
import Counter from '../components/Counter';
import { useAppQuery } from '../hooks/api';
import { FoodType, Food } from '../utils/type';
import { DAY_MILISECOND } from '../utils/constant';

type DrawerItem = {
  text: string;
  icon?: ReactNode;
  actions?: () => void;
  childrenItems?: DrawerItem[];
};

const getSubDrawerItems = (text: string, action: (data: Food) => void) => {
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

type SelectedFood = Food & { number: number };

const Home = () => {
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);

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
      onSuccess: () => {
        // TODO: 存到store
        console.log('TODO: 存到store');
      },
    },
  });

  // TODO: data should retrieve from store
  const drawerList = useMemo(() => {
    if (!foodTypesData) return [];

    const result = foodTypesData.reduce<DrawerItem[]>((res, currentType) => {
      const targetFoods =
        foodsData?.filter(({ type }) => type === currentType.id) || [];

      const childrenItems = targetFoods.map((food) => {
        const actions = getSubDrawerItems(food.name, () => {
          setSelectedFoods((prev) => [
            ...prev,
            {
              ...food,
              number: 1,
            },
          ]);
        });

        return actions;
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
  }, [foodTypesData, foodsData]);

  const handleUpdateSelectedFoods = (targetId: string, newValue: number) => {
    setSelectedFoods((prev) => {
      if (newValue < 1) {
        return prev.filter(({ id }) => {
          return id !== targetId;
        });
      }

      return prev.map(({ id, ...rest }) => {
        if (id === targetId) {
          return {
            id,
            ...rest,
            number: newValue,
          };
        }

        return {
          id,
          ...rest,
        };
      });
    });
  };

  return (
    <div className="flex h-full">
      <Drawer listData={drawerList} />

      <div className="flex-1 p-8">
        <div className="flex justify-between">
          <Typography variant="h4">購物車</Typography>

          <Button variant="contained">送出</Button>
        </div>

        <div className="my-4">
          {selectedFoods.map(({ id, name, number }) => (
            <div className="flex items-center [&>*+*]:ml-2" key={id}>
              <Typography>{name}</Typography>
              <Counter
                value={number}
                onValueUpdate={(newValue) => {
                  handleUpdateSelectedFoods(id, newValue);
                }}
              />
              <IconButton
                onClick={() => {
                  handleUpdateSelectedFoods(id, 0);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

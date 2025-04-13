import { useState } from 'react';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import IcecreamIcon from '@mui/icons-material/Icecream';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Drawer from '../components/Drawer';
import Counter from '../components/Counter';

const pizzaNames = [
  '瑪格莉特披薩',
  '夏威夷披薩',
  '燻雞披薩',
  '三倍起司披薩',
  '墨西哥披薩',
  '醬烤鮮菇披薩',
];
const icecreamNames = ['鮮奶霜淇淋', '紅茶霜淇淋', '咖啡霜淇淋'];
const beverageNames = ['紅茶', '綠茶', '奶茶', '烏龍茶', '麥茶', '柳橙汁'];

const getFoodList = (type: string) => (foodName: string) => {
  const data = {
    id: crypto.randomUUID(),
    type,
    name: foodName,
  };

  return {
    text: foodName,
    action: () => {
      // TODO:
      console.log('送去store', data);
    },
  };
};

const drawerList = [
  {
    text: '披薩',
    icon: <LocalPizzaIcon />,
    childrenItems: pizzaNames.map(getFoodList('pizza')),
  },
  {
    text: '霜淇淋',
    icon: <IcecreamIcon />,
    childrenItems: icecreamNames.map(getFoodList('icecream')),
  },
  {
    text: '飲料',
    icon: <EmojiFoodBeverageIcon />,
    childrenItems: beverageNames.map(getFoodList('beverage')),
  },
];

const Home = () => {
  // TODO: inital value should retrieve from store
  const [selectedFoods, setSelectedFoods] = useState([
    { id: 'f_001', number: 1 },
    { id: 'f_002', number: 1 },
  ]);

  const handleUpdateSelectedFoods = (id: string, newValue: number) => {
    setSelectedFoods((prev) => {
      if (newValue < 1) {
        return prev.filter((d) => {
          return d.id !== id;
        });
      }

      return prev.map((d) => {
        if (d.id === id) {
          return {
            id: d.id,
            number: newValue,
          };
        }

        return d;
      });
    });
  };

  return (
    <div className="flex h-full">
      <Drawer listData={drawerList} />

      <div className="flex-1 p-8" style={{ outline: '1px solid blue' }}>
        <Typography variant="h4" align="left">
          購物車
        </Typography>

        <div className="my-4">
          {selectedFoods.map(({ id, number }) => (
            <div className="flex items-center [&>*+*]:ml-2" key={id}>
              {/* TODO: query mock data to get food name */}
              <Typography>{id}</Typography>
              <Counter
                value={number}
                onValueUpdate={(newValue) => {
                  handleUpdateSelectedFoods(id, newValue);
                }}
              />
            </div>
          ))}
        </div>

        <Button variant="contained" className="float-left">
          送出
        </Button>
      </div>
    </div>
  );
};

export default Home;

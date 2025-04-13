import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import IcecreamIcon from '@mui/icons-material/Icecream';

import Drawer from '../components/Drawer';

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
  return (
    <div className="flex h-full">
      <Drawer listData={drawerList} />

      <div className="flex-1" style={{ outline: '1px solid blue' }}>
        TODO: cart
      </div>
    </div>
  );
};

export default Home;

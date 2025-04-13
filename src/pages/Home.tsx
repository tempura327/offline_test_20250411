import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import IcecreamIcon from '@mui/icons-material/Icecream';

import Drawer from '../components/Drawer';

const drawerList = [
  {
    text: '披薩',
    icon: <LocalPizzaIcon />,
    childrenItems: [
      {
        text: '瑪格莉特披薩',
        action: () => {
          console.log('瑪格莉特披薩');
        },
      },
      {
        text: '夏威夷披薩',
      },
      {
        text: '燻雞披薩',
      },
      {
        text: '三倍起司披薩',
      },
      {
        text: '墨西哥披薩',
      },
      {
        text: '醬烤鮮菇披薩',
      },
    ],
  },
  {
    text: '霜淇淋',
    icon: <IcecreamIcon />,
    childrenItems: [
      {
        text: '鮮奶霜淇淋',
      },
      {
        text: '紅茶霜淇淋',
      },
      {
        text: '咖啡霜淇淋',
      },
    ],
  },
  {
    text: '飲料',
    icon: <EmojiFoodBeverageIcon />,
    childrenItems: [
      {
        text: '紅茶',
      },
      {
        text: '綠茶',
      },
      {
        text: '奶茶',
      },
      {
        text: '烏龍茶',
      },
      {
        text: '麥茶',
      },
      {
        text: '柳橙汁',
      },
    ],
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

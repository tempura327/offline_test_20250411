import { FunctionComponent, ReactNode, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type DrawerItem = {
  text: string;
  icon?: ReactNode;
  action?: () => void;
  childrenItems?: DrawerItem[];
};

interface DrawerSubItemProps extends DrawerItem {
  open?: boolean;
  onClick?: () => void;
}

const DrawerSubItem: FunctionComponent<DrawerSubItemProps> = ({
  text,
  icon,
  action,
  childrenItems,
  open,
  onClick,
}) => {
  const toggleButton = open ? <ExpandLess /> : <ExpandMore />;

  return (
    <ListItemButton
      onClick={() => {
        action?.();
        onClick?.();
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
      {childrenItems && toggleButton}
    </ListItemButton>
  );
};

type DrawerItemProps = DrawerItem;

const DrawerItem: FunctionComponent<DrawerItemProps> = (props) => {
  const childrenItems = props?.childrenItems;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <DrawerSubItem {...props} open={open} onClick={handleClick} />

      {childrenItems && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {childrenItems.map((data) => {
              return <DrawerSubItem key={data.text} {...data} />;
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

interface DrawerProps {
  listData: DrawerItem[];
}

const Drawer: FunctionComponent<DrawerProps> = ({ listData }) => {
  return (
    <List
      component="nav"
      className="bg-sky-200 dark:bg-zinc-500 w-[320px] overflow-y-auto"
    >
      {listData.map((data) => {
        return <DrawerItem key={data.text} {...data} />;
      })}
    </List>
  );
};

export default Drawer;

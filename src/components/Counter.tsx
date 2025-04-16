import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FunctionComponent, ChangeEvent } from 'react';

interface CounterProps {
  value: number;
  onValueUpdate: (value: number) => void;
}

const Counter: FunctionComponent<CounterProps> = ({ value, onValueUpdate }) => {
  return (
    <div>
      <IconButton
        onClick={() => {
          if (value - 1 < 0) return;

          onValueUpdate(value - 1);
        }}
        aria-label="minus"
      >
        <RemoveIcon></RemoveIcon>
      </IconButton>
      <Input
        type="number"
        inputProps={{
          className: 'text-center',
          step: 1,
          min: 0,
        }}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onValueUpdate(parseInt(e.target.value) || 0);
        }}
      />
      <IconButton
        onClick={() => {
          onValueUpdate(value + 1);
        }}
        aria-label="plus"
      >
        <AddIcon></AddIcon>
      </IconButton>
    </div>
  );
};

export default Counter;

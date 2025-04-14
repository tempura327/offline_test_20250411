import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { FunctionComponent } from 'react';

import { Order as OrderContent } from '../utils/type';

type OrderProps = OrderContent;

const Order: FunctionComponent<OrderProps> = ({
  content,
  timeStamp,
  totalPrice,
}) => {
  return (
    <Paper className="p-6 w-1/2 [&>*+*]:!mt-8">
      <Typography variant="h6" className="text-left">
        {/* TODO: format */}
        {timeStamp}
      </Typography>

      <div className="grid grid-cols-2 gap-y-2">
        {content.map(({ name, price, number }) => (
          <Typography variant="body1" className="text-left">
            {name} ({price}) * {number}個
          </Typography>
        ))}
      </div>

      <Typography variant="body1" className="text-right">
        總計 {totalPrice} 元
      </Typography>
    </Paper>
  );
};

const OrderHistory = () => {
  return (
    <div className="p-8">
      <Typography variant="h4" className="text-left">
        訂單歷史
      </Typography>

      <div className="flex flex-col items-center mt-4 [&>*+*]:mt-4">
        {[
          {
            id: '6cab',
            content: [
              {
                id: 'f_008',
                type: 'ft_iceCream',
                name: '紅茶霜淇淋',
                price: 50,
                number: 1,
              },
              {
                id: 'f_007',
                type: 'ft_iceCream',
                name: '鮮奶霜淇淋',
                price: 35,
                number: 1,
              },
            ],
            timeStamp: 1744642365298,
            totalPrice: 85,
          },
        ].map((order) => (
          <Order {...order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;

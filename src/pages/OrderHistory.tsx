import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FunctionComponent, useCallback } from 'react';
import { format } from 'date-fns/format';
import { useNavigate } from 'react-router';

import { Order as OrderContent } from '@/utils/type';
import { useAppQuery, useAppMutation } from '@/hooks/api';
import { useAppDispatch } from '@/hooks/redux';
import { setSelectedFoods } from '@/stores/selectedFoodsSlice';
import { HTTPMethod } from '@/utils/request';

type OrderProps = OrderContent;

const Order: FunctionComponent<OrderProps> = ({
  id,
  content,
  timeStamp,
  totalPrice,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: deleteOrderHistoryMutate } = useAppMutation({
    url: `/orderHistory/${id}`,
    method: HTTPMethod.Delete,
    mutateOption: {
      onSuccess: () => {
        alert('刪除成功');
      },
      onError: () => {
        alert('刪除失敗');
      },
    },
  });

  const handleSetSelectedFoods = useCallback(() => {
    dispatch(setSelectedFoods(content));
    navigate('/');
  }, [content, dispatch, navigate]);

  const handleDeleteHistory = useCallback(() => {
    deleteOrderHistoryMutate({});
  }, [deleteOrderHistoryMutate]);

  return (
    <Paper className="p-6 w-1/2 [&>*+*]:!mt-8">
      <div className="flex justify-between">
        <Typography variant="h6" className="text-left">
          {format(timeStamp, 'yyyy/MM/dd hh:mm')}
        </Typography>

        <div className="[&>*+*]:!ml-4">
          <Button variant="outlined" onClick={handleSetSelectedFoods}>
            再點一次
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteHistory}
          >
            刪除紀錄
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-2">
        {content.map(({ name, price, number }) => (
          <Typography
            variant="body1"
            className="text-left"
            key={`${timeStamp}-${name}`}
          >
            {name} ({price}) * {number}個
          </Typography>
        ))}
      </div>

      <Typography variant="body1" className="text-right">
        總計 {totalPrice.toLocaleString()} 元
      </Typography>
    </Paper>
  );
};

const OrderHistory = () => {
  const { data } = useAppQuery<OrderContent[]>({
    url: '/orderHistory',
  });

  return (
    <div className="p-8">
      <Typography variant="h4" className="text-left">
        訂單歷史
      </Typography>

      <div className="flex flex-col items-center mt-4 [&>*+*]:mt-4">
        {data?.map((order) => <Order {...order} key={order.timeStamp} />)}
      </div>
    </div>
  );
};

export default OrderHistory;

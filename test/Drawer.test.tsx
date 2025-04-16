import { describe, test, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';

import Drawer from '@/components/Drawer';
import createWrapper from './utils';

describe('test Drawer', () => {
  beforeEach(() => {
    cleanup();
  });

  test('drawer should be rendered', () => {
    const drawer = createWrapper({
      children: <Drawer listData={[]} />,
    });

    expect(drawer).toBeTruthy();
  });

  test('drawer should contain 1 layer drawer with 2 items which do not have child items', async () => {
    const drawerList = [
      {
        text: 'Waffle',
      },
      {
        text: 'Souffle',
      },
    ];

    const drawer = createWrapper({
      children: <Drawer listData={drawerList} />,
    });

    expect(drawer).toBeTruthy();
    expect(drawer.getByText('Waffle')).toBeTruthy();
    expect(drawer.getByText('Souffle')).toBeTruthy();

    await userEvent.click(drawer.getByText('Waffle'));

    expect(drawer.container.querySelectorAll('.MuiList-root > *').length).toBe(
      2,
    );
  });

  test('should render the 2 layers drawer with 1 item', async () => {
    const drawerList = [
      {
        text: 'Waffle',
        childrenItems: [
          {
            text: 'Strawberry Waffle',
          },
          {
            text: 'Blueberry Waffle',
          },
        ],
      },
    ];

    const drawer = createWrapper({
      children: <Drawer listData={drawerList} />,
    });

    expect(drawer.container.querySelectorAll('.MuiList-root > *').length).toBe(
      1,
    );

    await userEvent.click(drawer.getByText('Waffle'));

    expect(drawer.getByText('Strawberry Waffle')).toBeTruthy();
    expect(drawer.getByText('Blueberry Waffle')).toBeTruthy();
  });
});

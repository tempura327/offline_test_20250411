import { describe, test, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { cleanup, render } from '@testing-library/react';

import Counter from '@/components/Counter';
import createWrapper from './utils';

describe('test Counter', () => {
  beforeEach(() => {
    cleanup();
  });

  test('counter should be rendered, and the has a input and 2 buttons', () => {
    const counter = createWrapper({
      children: <Counter value={1} onValueUpdate={() => {}} />,
    });

    expect(counter).toBeTruthy();

    const input = counter.container.querySelector('input');
    expect(input).toBeTruthy();

    const buttons = counter.container.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  test('initial value of input should be 1', () => {
    const counter = createWrapper({
      children: <Counter value={1} onValueUpdate={() => {}} />,
    });

    const input = counter.container.querySelector('input');

    expect(input?.value).toBe('1');
  });

  test('if plus button be clicked, value of input should be changed from 1 to 2', async () => {
    let number = 1;

    const handleUpdateNumber = (newValue: number) => {
      number = newValue;
    };

    const { rerender } = render(
      <Counter value={number} onValueUpdate={handleUpdateNumber} />,
    );

    const plusButton = document.querySelector('button[aria-label="plus"]');

    expect(plusButton).toBeTruthy();
    await userEvent.click(plusButton!);

    rerender(<Counter value={number} onValueUpdate={handleUpdateNumber} />);

    const input = document.querySelector('input');

    expect(input?.value).toBe('2');
    expect(number).toBe(2);
  });

  test('if minus button be clicked, value of input should be changed from 2 to 1', async () => {
    let number = 2;

    const handleUpdateNumber = (newValue: number) => {
      number = newValue;
    };

    const { rerender } = render(
      <Counter value={number} onValueUpdate={handleUpdateNumber} />,
    );

    const minusButton = document.querySelector('button[aria-label="minus"]');

    expect(minusButton).toBeTruthy();
    await userEvent.click(minusButton!);

    rerender(<Counter value={number} onValueUpdate={handleUpdateNumber} />);

    const input = document.querySelector('input');

    expect(input?.value).toBe('1');
    expect(number).toBe(1);
  });

  test('if enter 10 to the input, value of input should be changed from 1 to 10', async () => {
    let number = 1;

    const handleUpdateNumber = (newValue: number) => {
      number = newValue;
    };

    const { rerender } = render(
      <Counter value={number} onValueUpdate={handleUpdateNumber} />,
    );

    const input = document.querySelector('input');

    await userEvent.type(input!, '10');

    rerender(<Counter value={number} onValueUpdate={handleUpdateNumber} />);

    expect(input?.value).toBe('10');
    expect(number).toBe(10);
  });
});

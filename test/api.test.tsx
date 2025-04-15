import { vi, it, expect, Mock } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';

import { clientsApi } from '../src/utils/request';
import { useAppQuery } from '../src/hooks/api';
import React from 'react';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  useAppQuery: vi.fn(),
}));

vi.mock('../src/hooks/api', () => ({
  useAppQuery: vi.fn(),
}));

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>();

  const mockAxios = {
    default: {
      ...actual.default,
      get: mocks.get,
      post: mocks.post,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
      // ------------
      useAppQuery: mocks.useAppQuery,
    },
  };

  return mockAxios;
});

it('should call axios.get', async () => {
  mocks.get.mockResolvedValueOnce([]);
  await clientsApi.getClients();
  expect(mocks.get).toHaveBeenCalled(); // should return true
});

const createWrapper = () => {
  // ✅ creates a new QueryClient for each test
  const queryClient = new QueryClient();

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

it('should call useAppQuery', () => {
  (useAppQuery as Mock).mockReturnValue({
    data: [],
    isLoading: false,
    error: null,
  });

  renderHook(() => useAppQuery({ url: '/foods' }), {
    wrapper: createWrapper(),
  });

  expect(useAppQuery).toHaveBeenCalled();
});

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { request, get, HTTPMethod } from '@/utils/request';

interface UseAppQueryParams<TResponse> {
  url: string;
  queryOption?: Omit<UseQueryOptions<TResponse>, 'queryKey'> & {
    onSuccess?: (data: TResponse) => void;
    onError?: (err: Error) => void;
  };
  axiosConfig?: AxiosRequestConfig;
}

export const useAppQuery = <TResponse>({
  url,
  axiosConfig,
  queryOption,
}: UseAppQueryParams<TResponse>) => {
  const res = useQuery({
    queryKey: [url],
    queryFn: async () => {
      return await get<TResponse>({
        url,
        config: axiosConfig,
      });
    },
    ...queryOption,
  });

  if (res.error) {
    queryOption?.onError?.(res.error);
  }

  if (res.data) {
    queryOption?.onSuccess?.(res.data);
  }

  return res;
};

interface UseAppMutationParams<TResponse, TPayload> {
  url: string;
  method: HTTPMethod;
  mutateOption?: UseMutationOptions<TResponse, Error, TPayload>;
  axiosConfig?: AxiosRequestConfig;
}

export const useAppMutation = <TResponse, TPayload>({
  url,
  method,
  mutateOption,
  axiosConfig,
}: UseAppMutationParams<TResponse, TPayload>) => {
  return useMutation({
    mutationFn: async (payload: TPayload) => {
      return await request<TResponse, TPayload>({
        url,
        method,
        payload,
        config: axiosConfig,
      });
    },
    ...mutateOption,
  });
};

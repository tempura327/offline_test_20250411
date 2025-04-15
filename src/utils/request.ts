import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

export const clientsApi = {
  getClients: async () => {
    const response = await axios.get('http://localhost:3000/orderHistory');
    return response.data;
  },
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export enum HTTPMethod {
  Post = 'post',
  Patch = 'patch',
  Delete = 'delete',
  Get = 'get',
}

interface RequestParams {
  url: string;
  config?: AxiosRequestConfig;
}

interface RequestParamsWithPayload<TPayload> extends RequestParams {
  payload: TPayload;
}

export const get = async <TResponse>({
  url,
  config,
}: RequestParams): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.get(
    url,
    config,
  );

  return response.data;
};

export const post = async <TResponse, TPayload>({
  url,
  payload,
  config,
}: RequestParamsWithPayload<TPayload>): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.post(
    url,
    payload,
    config,
  );
  return response.data;
};

export const patch = async <TResponse, TPayload>({
  url,
  payload,
  config,
}: RequestParamsWithPayload<TPayload>): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.patch(
    url,
    payload,
    config,
  );
  return response.data;
};

export const remove = async <TResponse>({
  url,
  config,
}: RequestParams): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.delete(
    url,
    config,
  );

  return response.data;
};

interface AppRequestParams<TPayload> {
  url: string;
  method: HTTPMethod;
  config?: AxiosRequestConfig;
  payload: TPayload;
}

export const request = async <TResponse, TPayload = object>({
  url,
  method,
  payload,
  config,
}: AppRequestParams<TPayload>): Promise<TResponse> => {
  switch (method) {
    case HTTPMethod.Post:
      return await post<TResponse, TPayload>({ url, payload, config });
    case HTTPMethod.Patch:
      return await patch<TResponse, TPayload>({ url, payload, config });
    case HTTPMethod.Delete:
      return await remove<TResponse>({ url, config });
    default:
      throw new Error('Invalid HTTP method');
  }
};

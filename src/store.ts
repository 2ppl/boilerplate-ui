import {
  BaseQueryFn,
  createApi,
  EndpointDefinition,
  fetchBaseQuery,
  setupListeners
} from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';
import { pageApi } from '~/page/redux';

export const store = configureStore({
  reducer: {
    [pageApi.reducerPath]: pageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    pageApi.middleware,
  ],
});

setupListeners(store.dispatch);

import { createApi } from '@reduxjs/toolkit/query/react';
import { publicAPI } from '@2ppl/boilerplate-schema';
import { createCrudBaseQuery, createCrudEndpoints } from '~/ui/crud/redux';

export const pageApi = createApi({
  reducerPath: 'pageApi',
  baseQuery: createCrudBaseQuery(publicAPI.page),
  endpoints: createCrudEndpoints,
});

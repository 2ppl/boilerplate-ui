import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { CrudFindAllQuery } from '@2ppl/core/crud';
import { BaseCrudType } from '@2ppl/core/dist/crud/common';

export const createCrudEndpoints = (build: EndpointBuilder<BaseQueryFn, any, any>) => ({
  create: build.query({
    query: (params) => ({
      type: 'CREATE',
      params,
    }),
  }),
  update: build.query({
    query: (params) => ({
      type: 'UPDATE',
      params,
    }),
  }),
  remove: build.query({
    query: (params) => ({
      type: 'REMOVE',
      params,
    }),
  }),
  findAll: build.query({
    query: (q: { query: CrudFindAllQuery }) => ({
      type: 'FIND_ALL',
      query: q.query,
    }),
  }),
  findOne: build.query({
    query: (q: { key: BaseCrudType['entityKey'] }) => ({
      type: 'FIND_ONE',
      key: q.key,
    }),
  }),
});

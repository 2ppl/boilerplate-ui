import React, { useEffect, useState } from 'react';
import {
  BaseQueryFn,
  createApi,
  EndpointDefinition,
  fetchBaseQuery,
  setupListeners
} from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { publicAPI } from '@2ppl/boilerplate-schema';

// POKEMON

export type Pokemon = any;

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;

// PAGE

const customBaseQuery = (
  args,
  { signal, dispatch, getState },
  extraOptions
) => {
  console.log('customBaseQuery', 'args', args);
  console.log('customBaseQuery', 'signal', signal);
  console.log('customBaseQuery', 'dispatch', dispatch);
  console.log('customBaseQuery', 'getState', getState);
  console.log('customBaseQuery', 'extraOptions', extraOptions);
  if (Math.random() > 0.5) return { error: 'Too high!' }
  return { data: 'All good!' }
}

const customBPAPI: BaseQueryFn = (args) => {
  return new Promise((resolve, reject) => {
    console.log('RESOLVE', args);
    publicAPI.page.findOne({ id: args })
      .then((data) => {
        resolve({
          data,
          error: void 0,
        });
      })
      .catch((error) => {
        reject({
          error,
        });
      });
    // setTimeout(() => {
    //   resolve({
    //     data: `lol: ${args}`,
    //     error: void 0,
    //     meta: { a: 1 },
    //   });
    // }, 1000);
  });
};

const a: EndpointDefinition = 1;

export const pageApi = createApi({
  reducerPath: 'pageApi',
  baseQuery: customBPAPI,
  endpoints: (build) => {
    const q = build.query({
      query: (id) => id,
    });
    console.log('q:', q);
    const list = (id, a) => {
      console.log('GET LIST', id, a);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(111);
        }, 500);
      });
    };
    return {
      getKekLol: build.query({
        query: (id) => id,
      }),
      getList: q,
      // getList: {
      //   type: 'query',
      //   query: (a, b, c) => {
      //     console.log('query function:', a, b, c);
      //     return '1';
      //   },
      // },
    };
  },
});

export const { useGetKekLolQuery, useGetListQuery } = pageApi;

// STORE

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [pageApi.reducerPath]: pageApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    pokemonApi.middleware,
    pageApi.middleware,
  ],
});

setupListeners(store.dispatch);

// COMPONENT

let re = 0;

const poks = [
  'pikachu',
  'charizard',
  'bulbasaur',
];

export const PageCrudListChild: React.FC = () => {
  re++;

  const [pok, setPok] = useState(0);

  const handleNextPokClick = () => {
    if ((pok + 1) < poks.length) {
      setPok(pok + 1);
    } else {
      setPok(0);
    }
  };

  const { data, error, isLoading } = useGetKekLolQuery(pok + 1);
  console.log(poks[pok], '>>>', 'loading', isLoading);

  const gl = useGetListQuery('aaa');
  console.log('gl:', gl);

  return (
    <div>
      PAGE CRUD LIST
      <ul>
        <li>render: {re}</li>
        <li>pok: {pok} - {poks[pok]}</li>
        <li>
          <button onClick={handleNextPokClick}>next poc</button>
        </li>
        <li>error: {error ? JSON.stringify(error) : '-'}</li>
        <li>isLoading: {isLoading ? 'LOADING' : '-'}</li>
        <li style={{ maxHeight: 110, overflow: 'hidden' }}>data: {data ? JSON.stringify(data) : '-'}</li>
      </ul>
    </div>
  );
};

export const PageCrudList: React.FC = () => {
  return (
    <Provider store={store}>
      <PageCrudListChild/>
    </Provider>
  );
};

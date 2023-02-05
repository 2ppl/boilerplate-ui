import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicAPI } from '@2ppl/boilerplate-schema';
import { App, AppNotFound } from '~/app';
import { PageCrud } from '~/page/components';
import { Provider } from 'react-redux';
import { store } from '~/store';

publicAPI.setBaseURL('/api');

publicAPI.setBearerGetter(() => {
  console.log('BEARER GET');
  return 'kek-lol';
});

// publicAPI.page.findAll()
//   .then((res) => console.log('res:', res))
//   .catch((res) => console.log('err:', res));

const container = document.querySelector('#root') as Element;
const root = createRoot(container);

root.render((
  <BrowserRouter>
    <Provider store={store}>
      <App>
        <Routes>
          <Route path={'/page/*'} element={<PageCrud/>}/>
          <Route path={'*'} element={<AppNotFound/>}/>
        </Routes>
      </App>
    </Provider>
  </BrowserRouter>
));

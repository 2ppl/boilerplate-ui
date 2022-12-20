import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicAPI } from '@2ppl/boilerplate-schema';
import { App, AppNotFound } from '~/app';
import { PageCrud } from '~/page';

publicAPI.setBaseURL('/api');

publicAPI.page.findAll()
  .then((res) => console.log('res:', res))
  .catch((res) => console.log('err:', res));

const container = document.querySelector('#root') as Element;
const root = createRoot(container);

root.render((
  <BrowserRouter>
    <App>
      <Routes>
        <Route path={'/page/*'} element={<PageCrud/>}/>
        <Route path={'*'} element={<AppNotFound/>}/>
      </Routes>
    </App>
  </BrowserRouter>
));

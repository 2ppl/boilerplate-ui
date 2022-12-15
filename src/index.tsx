import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '~/app';

const container = document.querySelector('#root') as Element;
const root = createRoot(container);

root.render((
  <App>
    123
  </App>
));

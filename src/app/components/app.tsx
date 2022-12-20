import React from 'react';
import { MuiThemeProvider } from './mui-theme-provider';

export const App: React.FC<React.PropsWithChildren> = (props) => (
  <MuiThemeProvider>
    {props.children}
  </MuiThemeProvider>
);

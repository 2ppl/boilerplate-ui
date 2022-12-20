import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#e0e5ea',
    },
    // primary: {
    //   main: '#64982d',
    // },
    // text: {
    //   primary: '#f0f',
    //   secondary: '#00f',
    //   disabled: '#f00',
    // },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#16191c',
      default: '#2f363b',
    },
  },
});

export const MuiThemeProvider: React.FC<React.PropsWithChildren> = (props) => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles
      styles={(theme) => ({
        img: { display: 'block', maxWidth: '100%' },
        svg: { display: 'block' },
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          margin: 0,
          padding: 0,
        },
      })}
    />
    {props.children}
  </ThemeProvider>
);

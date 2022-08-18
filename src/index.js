import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import './styles/style.css'
ReactDOM.render(
  
  <ThemeProvider theme={theme}>
   
  <App />
  </ThemeProvider>
  
,
  
  document.getElementById('root')
);


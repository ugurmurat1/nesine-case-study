import React from 'react';
import { AppProvider } from './context/AppContext';
import Router from './router/Index';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;

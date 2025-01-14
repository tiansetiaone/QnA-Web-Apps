import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react'; // Impor React di sini
import AppRouter from './router/AppRouter';
import './styles/main.css';


function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;

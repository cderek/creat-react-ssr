import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router';
import './app.scss';

function App() {
  return (
    <div>
      <header className="header">
        <nav className="inner">
          <Link to="/">home page</Link>
          <Link to="/detail"> detail page</Link>
          <a href="/" className="">
            Built with React SSR
          </a>
        </nav>
      </header>
      <Routes />
    </div>
  );
}

export default App;

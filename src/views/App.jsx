import React from 'react'
import { Link } from 'react-router-dom'
import Routes from '../config/router'

function App() {
  return (
    <div>
      <Link to="/">home page</Link>
      <br />
      <Link to="/detail"> detail page</Link>
      <Routes />
    </div>
  )
}

export default App

import React from 'react'

import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

export const Header = () => {
  const history = useHistory();
  const handleClick = () => {
    console.log('clicked?')
    history.push('/start-here')
  };

  return (
    <nav>
      <section>
        <h1 className="header-link">
          <Link to="/">React Layout Manager</Link>
          <button type="button" onClick={handleClick}>Start Here</button>
        </h1>
  
        <div className="navContent">
          <div className="navLinks">
            <Link className="nav-link" to="/">Posts</Link>
            <Link className="nav-link" to="/component-registry">Component Registry</Link>
            <Link className="nav-link" to="/layout-config">Layout Config</Link>
            <Link className="nav-link" to="/auto-wired">Autowired</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
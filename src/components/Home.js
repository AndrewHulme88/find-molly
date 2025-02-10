import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Home = () => (
  <div className="home-container">
    <h1>Find Molly</h1>
    <Link to="/level/1"><button>Level 1</button></Link>
    <Link to="/level/2"><button>Level 2</button></Link>
    <Link to="/level/3"><button>Level 3</button></Link>
  </div>
);

export default Home;

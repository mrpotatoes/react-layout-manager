/* eslint-disable import/no-anonymous-default-export */

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BlogLeft from './layouts/blog-left'
import BlogRight from './layouts/blog-right'
import Complex from './layouts/complex'
import HeroImage from './layouts/hero-image'
import ListingLeft from './layouts/listing-left'
import ListingRight from './layouts/listing-right'
import ThreeColumns from './layouts/3-columns'
import TwoColumn from './layouts/2-columns'

const Home = () => <h2>Pick something from above</h2>

export default () => (
  <div className="App">
    <Router>
      <div>
        Links to diff layouts

        <nav>
          <Link to="/2-columns">2 Columns</Link> | {' '}
          <Link to="/3-columns">3 Columns</Link> | {' '}
          <Link to="/blog-left">Blog Left</Link> | {' '}
          <Link to="/blog-right">Blog Right</Link> | {' '}
          <Link to="/complex">Complex</Link> | {' '}
          <Link to="/hero-image">Hero Image</Link> | {' '}
          <Link to="/listing-left">Listing Left</Link> | {' '}
          <Link to="/listing-right">Listing Right</Link>
        </nav>

        <br />

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/2-columns" element={<TwoColumn/>} />
          <Route path="/3-columns" element={<ThreeColumns />} />
          <Route path="/blog-left" element={<BlogLeft />} />
          <Route path="/blog-right" element={<BlogRight />} />
          <Route path="/complex" element={<Complex />} />
          <Route path="/hero-image" element={<HeroImage />} />
          <Route path="/listing-left" element={<ListingLeft />} />
          <Route path="/listing-right" element={<ListingRight />} />          
        </Routes>
      </div>
    </Router>
  </div>
);

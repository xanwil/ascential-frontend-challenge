import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Venues from './components/Venues';
import Venue from './components/Venue';
import Events from './components/Events';
import Event from './components/Event';
import FavouritesDrawer from './components/FavouritesDrawer';
import Nav from './components/Nav';
import { FavouritesProvider } from './contexts/FavouritesContext';

const App: React.FC = () => (
  <FavouritesProvider>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/venues" Component={Venues} />
        <Route path="/venues/:venueId" Component={Venue} />
        <Route path="/events" Component={Events} />
        <Route path="/events/:eventId" Component={Event} />
      </Routes>
      <FavouritesDrawer />
    </Router>
  </FavouritesProvider>
);

export default App;

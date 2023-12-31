import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchMovies} />
          <Route exact path='/watchlist' component={SavedMovies} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default App;
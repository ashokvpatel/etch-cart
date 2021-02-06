import React, { Component } from 'react';
import Products from './components/ProductList';
import Cart from './components/Cart';
import UploadFile from './components/UploadFile';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-item nav-link" to="/">Product Add</Link>
                  <Link className="nav-item nav-link" to="/list">Product List</Link>
                  <Link className="nav-item nav-link" to="/cart">Product Cart</Link>
                </div>
              </div>
            </div>
          </nav>
          <div className="container">
            <br />
            <Route exact path="/" component={UploadFile} />
            <Route exact path="/list" component={Products} />
            <Route exact path="/cart" component={Cart} />            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CreateAccountField from './components/CreateAccountField';
import LogInField from './components/LogInField';
import TwoWheels from './components/TwoWheels';
import BikeRack from './components/BikeRack';
import Bicycles from './components/Bicycles';
import AddBicycleForm from './components/AddBicycleForm';
import Rentals from './components/Rentals';
import Contact from './components/Contact';
// import UploadImage from './components/UploadImage';
// import logo from './logo.svg';
import './App.css';

function App() {
  // localStorage.removeItem("user")
  // localStorage.removeItem("username")
  // localStorage.removeItem("userId")
  let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("username") ? true : false)
  let existingUser = JSON.parse(localStorage.getItem("user"));
  // localStorage.removeItem("bikeRack");
  let renderLogInField = () => 
    <LogInField setIsLoggedIn={setIsLoggedIn} />

  let renderCreateAccountField = () => 
    <CreateAccountField setIsLoggedIn={setIsLoggedIn} />  

  let logoutClickHandler = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    // window.location.href = "/home";
  }
  
  function display() {
    if(isLoggedIn === false) {
      return(
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
              <Navbar.Brand href="/home">
              <i className="fa fa-circle-o-notch fa-spin fa-lg"></i>
              <i className="fa fa-circle-o-notch fa-spin"></i>
              <span id="navName" className="ml-3">
              TWO WHEELS
              <small className="font-italic">are better than 4</small>
              </span>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className="navLinks" href="/bikes">Bikes</Nav.Link>
                <Nav.Link className="navLinks" href="/contact">Contact</Nav.Link>
              </Nav>

              <Nav className="d-flex justify-content-between">
                <Nav.Link className="navLinks" href="/create-account">Create Account</Nav.Link>
                <Nav.Link href="/login"><i className="fa fa-user-circle fa-2x"></i></Nav.Link>
                <Nav.Link href="/bike-rack">
                  <i  className="fas fa-bicycle fa-2x mr-2 badge"></i>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>


            
            <Route path="/bikes" component={Bicycles}/>
            <Route path="/contact" exact component={Contact}/>
            <Route path="/login" exact render={renderLogInField}/>
            <Route path="/bike-rack" exact component={BikeRack}/>
            <Route path="/create-account" exact render={renderCreateAccountField}/>

        </React.Fragment>
      );
    } 
    else{
      if(existingUser.role.id === 2) {
        return(
          <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="/home">
                <i className="fa fa-circle-o-notch fa-spin fa-lg"></i>
                <i className="fa fa-circle-o-notch fa-spin"></i>
                <span id="navName" className="ml-3">
                TWO WHEELS
                <small>are better than 4</small>
                </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">

                  <Nav.Link className="navLinks" href="/bikes">Bikes</Nav.Link>
                  <Nav.Link className="navLinks" href="/my-rentals">My Rentals</Nav.Link>
                  <Nav.Link className="navLinks" href="/contact">Contact</Nav.Link>
            
                </Nav>
                <Nav className="d-flex justify-content-between">
                  <Link to="/home">
                    <i id="logoutIcon" onClick={logoutClickHandler} className="fa fa-user-circle fa-2x pt-2" style={{color:"gray"}}></i>
                  </Link>
                  <Nav.Link href="/bike-rack">
                    <i className="fas fa-bicycle fa-2x"></i>
                    <span className="text-secondary align-self-center ml-3">{existingUser.role.role + " " + existingUser.firstName}</span>
                  </Nav.Link>
                
                </Nav>
              </Navbar.Collapse>

              </Navbar>
              <Route path="/login" exact render={renderLogInField}/>
              
              <Route path="/bikes" component={Bicycles}/>
              <Route path="/contact" exact component={Contact}/>
              <Route path="/my-rentals" exact component={Rentals}/>
              <Route path="/bike-rack" exact component={BikeRack}/>
            
          </React.Fragment>
        );
      }
      else {
        return(  
          <React.Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="/home">
                <i className="fa fa-circle-o-notch fa-spin fa-lg"></i>
                <i className="fa fa-circle-o-notch fa-spin"></i>
                <span id="navName" className="ml-3">
                TWO WHEELS
                <small>are better than 4</small>
                </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link className="navLinks" href="/bikes">Bikes</Nav.Link>
                  <Nav.Link className="navLinks" href="/addBike">Add Bike</Nav.Link>
                  <Nav.Link className="navLinks" href="/rentals">Rentals</Nav.Link>
            
                </Nav>
                <Nav className="d-flex justify-content-between">
                   <Link to="/home">
                    <i id="logoutIcon" onClick={logoutClickHandler} className="fa fa-user-circle fa-2x mr-2" style={{color:"gray"}}></i>
                  </Link>
                 <span className="text-secondary align-self-center navLinks">{existingUser.role.role + " " + existingUser.firstName}</span>
                
                </Nav>
              </Navbar.Collapse>

              </Navbar>

            
              <Route path="/bikes" component={Bicycles}/>
              <Route path="/addBike" exact component={AddBicycleForm}/>
              <Route path="/rentals" exact component={Rentals}/>
          </React.Fragment>
        );
      }
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        {display()}
      </div>

      <Route path="(/|/home)" component={TwoWheels}/>
      <footer className="container-fluid footer p-0 bg-secondary">
        <div className="row text-center">

          <div className="col-lg-12 text-center">
                
            <p className="copyright text-center my-0 ml-3 py-3"><small> &copy; 2019 Two Wheels </small>
            </p>
          </div> 
        </div>
      </footer>

    </BrowserRouter>
  );
}

export default App;

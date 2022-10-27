import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
  const token = localStorage.getItem('token')
  const navigator = useNavigate();

  function logout() {
    localStorage.clear()
    navigator('/login')
  }
  return (
    <Navbar bg="tranparent" expand="lg" variant='dark' className='mb-5'>
      <Container fluid>
        <Navbar.Brand href="#" className="bold-logo">Noxe</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className="justify-content-end"
        >
          <Nav
            className="ms-2 w-100 my-2 my-lg-0 justify-content-between"
            style={{ maxHeight: '100px' }}
          >
            {token !== null && <div className="main-links me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/movies">Movies</Nav.Link>
              <Nav.Link href="/tv">TV Shows</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </div>}
            
            <div className='ms-auto d-flex '>
            {token !== null && 
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
              />}

              <div className="social-links">
                <Nav.Link href="#"  ><i className="fa-brands fa-facebook"></i></Nav.Link>
                <Nav.Link href="#"  ><i className="fa-brands fa-instagram"></i></Nav.Link>
                <Nav.Link href="#"  ><i className="fa-brands fa-youtube"></i></Nav.Link>
              </div>

              <div className="user-links">
                {token === null ? <>
                  <Nav.Link href="/register"  >Register</Nav.Link>
                <Nav.Link href="/login"  >Login</Nav.Link>
                </> : <span disabled onClick={logout} className='nav-link d-block pointer'>
                  Logout
                </span>}            
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
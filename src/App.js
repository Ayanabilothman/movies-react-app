import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './Components/Bootstrap/Navbar';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { Movies } from './Components/Movies';
import { TV } from './Components/TV';
import { About } from './Components/About';
import {MovieDetails} from './Components/MovieDetails';
import { Notfound } from './Components/Notfound';
import { Routeguard } from './Components/Routeguard';

function App() {
  const token = localStorage.getItem('token')

  const[moviesList, setMoviesList] = useState([]);
  const[tvList, setTvList] = useState([]);

  async function getData(updateFunction, mediaType) {
    const {data} = await Axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=9a4b9af118e866df929cca1f0a81e601`);
    updateFunction(data.results);
  }

  

  useEffect(()=>{
    getData(setMoviesList, 'movie');
    getData(setTvList, 'tv');
  },[])

  return (
    <>
      <NavBar/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Routeguard> <Home movies={moviesList} tv={tvList}/> </Routeguard>} />
          <Route path='/home' element={<Routeguard> <Home movies={moviesList} tv={tvList}/></Routeguard>} />
          <Route path='/login' element={token !== null ? <Navigate to="/" /> : <Login />} />
          <Route path='/register' element={token !== null ? <Navigate to="/" /> : <Register/>} />
          <Route path='/movies' element={<Routeguard><Movies movies={moviesList}/></Routeguard>} />
          <Route path='/movies/:movieId' element={<Routeguard><MovieDetails/></Routeguard>} />
          <Route path='/tv' element={<Routeguard><TV tv={tvList}/></Routeguard>} />
          <Route path='/about' element={<Routeguard><About/></Routeguard>} />
          <Route path='*' element={<Notfound/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;

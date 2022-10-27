import React from 'react';
import { Link } from 'react-router-dom';

export function Movies(props) {
  return (
      <>
        <div className='row gy-3'>
          {props.movies.map((movie) => <div key={movie.id} className="col-lg-2"> 
            <div className="movie-info pointer position-relative">
              <Link to={`${movie.id}`}>
                <img src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} alt={movie.title.substring(0,9)} className='w-100'/>
                <h3 className='text-center h6 mt-2'>{movie.title}</h3>
                <div className='bg-info p-2 position-absolute end-0 top-0'> {Math.round(movie.vote_average)}</div>
              </Link>
            </div>
           </div> )}
        </div>
      </> 
  )
}

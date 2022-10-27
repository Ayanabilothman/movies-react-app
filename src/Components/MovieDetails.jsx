import React from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export function MovieDetails() {
  const params = useParams();
  const id = params.movieId;
  const [movie, setMovie] = useState(null);

  
  useEffect(() => {
    async function showDetails() {
      const { data } = await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9a4b9af118e866df929cca1f0a81e601`);
      setMovie(data);
    }
  
    showDetails();
  }, [id])

  return (
    <>
      {movie ? <div className="row">
        <div className="col-lg-4">
          <div className="poster">
            <img src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} alt={movie.title.substring(0, 9)} className='w-100' />
          </div>

        </div>
        <div className="col-lg-8">
          <div className="info">
            <h2 className='text-white'>
              {movie.title}
            </h2>
            {movie.tagline && <p className='text-grey'>{movie.tagline}</p>}
      
            <div className="tags">
              {movie.genres.map((genre) => <span key={genre.id} className='bg-info text-white me-2 mb-2 p-1 rounded d-inline-block'>{genre.name}</span>)}
            </div>

            <small className='my-4 d-block'>
              Vote: {movie.vote_average}
            </small>

            <small className='my-4 d-block'>
              Vote Count: {movie.vote_count}
            </small>
            
            <small className='my-4 d-block'>
              Release Date: {movie.release_date}
            </small>


            <p className='text-grey'>
              {movie.overview}
            </p>


          </div>
        </div>
      </div>:<div className='vh-80 d-flex align-items-center justify-content-center'>
          <i className='fas fa-spinner fa-spin fa-4x'></i>
        </div>
      }
    </>
  )
}

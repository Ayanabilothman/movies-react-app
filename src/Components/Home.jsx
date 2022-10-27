import React from 'react';

export function Home(props) {

  return (
      <>
        <div className='row gy-3'>
          <div className="col-md-4">
            <div className="mt-4 intro-home">
              <h2>
                Trending <br/> Movies <br/> to Watch Now
              </h2>
              <small className="text-grey">
                Most Watched Movies by days
              </small>
            </div>
          </div>  

          {props.movies.slice(0,10).map((movie) => <div key={movie.id} className="col-lg-2"> 
            <div className="movie-info position-relative">
              <img src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path} alt={movie.title.substring(0,9)} className='w-100'/>
              <h3 className='text-center h6 mt-2'>{movie.title}</h3>
              <div className='bg-info p-2 position-absolute end-0 top-0'> {Math.round(movie.vote_average)}</div>
            </div>
           </div> )}
        </div>

        <div className='row gy-3 my-4'>
          <div className="col-md-4">
            <div className="mt-4 intro-home">
              <h2>
                Trending <br/> TV Shows <br/> to Watch Now
              </h2>
              <small className="text-grey">
                Most Watched TV shows by days
              </small>
            </div>
          </div>  

          {props.tv.slice(0,10).map((tv) => <div key={tv.id} className="col-lg-2"> 
            <div className="tv-info position-relative">
              <img src={'https://image.tmdb.org/t/p/w500/'+tv.poster_path} alt={tv.name.substring(0,9)} className='w-100'/>
              <h3 className='text-center h6 mt-2'>{tv.name}</h3>
              <div className='bg-info p-2 position-absolute end-0 top-0'> {Math.round(tv.vote_average)}</div>
            </div>
           </div> )}
        </div>
      </> 
  )
}

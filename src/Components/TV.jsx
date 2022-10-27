import React from 'react';

export function TV(props) {

  return (
      <>
        <div className='row gy-3'>
          {props.tv.map((tv) => <div key={tv.id} className="col-lg-2"> 
            <div className="movie-info pointer position-relative">
              <img src={'https://image.tmdb.org/t/p/w500/'+tv.poster_path} alt={tv.name.substring(0,9)} className='w-100'/>
              <h3 className='text-center h6 mt-2'>{tv.name}</h3>
              <div className='bg-info p-2 position-absolute end-0 top-0'> {Math.round(tv.vote_average)}</div>
            </div>
           </div> )}
        </div>
      </> 
  )
}

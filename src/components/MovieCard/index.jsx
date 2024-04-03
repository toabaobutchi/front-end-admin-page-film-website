import './MovieCard.scss'

function MovieCard({ imgAttributes = {}, children = '', movie = '' }) {
  return (
    <div className='movie-card'>
      <img {...imgAttributes} />
      <p className='movie-name'>{ movie.name }</p>
      <div className='movie-card-overlay'>{children}</div>
    </div>
  )
}

export default MovieCard

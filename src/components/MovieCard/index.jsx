import './MovieCard.scss'

function MovieCard({ imgAttributes = {}, children = '' }) {
  return (
    <div className='movie-card'>
      <img {...imgAttributes} onError={(e) => {e.target.src = '../assets/default.jpg'}} />
      <div className='movie-card-overlay'>{children}</div>
    </div>
  )
}

export default MovieCard

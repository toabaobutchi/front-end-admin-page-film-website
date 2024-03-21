import './MovieCard.scss'

function MovieCard({ imgAttributes = {}, children = '' }) {
  return (
    <div className='movie-card'>
      <img {...imgAttributes} />
      <div className='movie-card-overlay'>
        
        {children}
      </div>
    </div>
  );
}

export default MovieCard;
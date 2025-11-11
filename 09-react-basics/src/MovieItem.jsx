import "./MovieItem.css";
import Pill from "./Pill";

const Fallback =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/250px-Question_mark_%28black%29.svg.png";

function MovieItem({ movie }) {
  const rk = movie.rating === "" ? "rating-none" : movie.rating >= 8 ? "rating-high" : movie.rating >= 5 ? "rating-mid" : "rating-low";
  const src = movie.image ? movie.image : Fallback;

  return (
    <li className="card">
      <div className="item">
        <img className="poster" src={src} alt={movie.title} />
        <div className="content">
          <div className="title">{movie.title}</div>
          <div className="row">
            <Pill text={movie.genre} kind="genre" />
            {movie.rating !== "" && <Pill text={String(movie.rating)} kind={rk} />}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MovieItem;
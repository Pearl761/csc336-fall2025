import { useState } from "react";
import "./App.css";
import MovieItem from "./MovieItem";

function Home({ watchedMovies, onAddWatchedMovie, watchlist }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");

  function addMovie() {
    onAddWatchedMovie({ title, genre, rating, image });
    setTitle("");
    setGenre("");
    setRating("");
    setImage("");
  }

  return (
    <div>
      <h1>Movie Queue</h1>

      {/* 添加一部已看电影 */}
      <div className="formRow">
        <input
          type="text"
          placeholder="Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="Rating 0-10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={addMovie} disabled={!title.trim()}>
          Add
        </button>
      </div>

      {/* 已看过的电影 */}
      <h2>Watched Movies</h2>
      <ul className="list">
        {watchedMovies.map((m) => (
          <MovieItem key={m.id} movie={m} />
        ))}
      </ul>

      {/* 想看的电影（由 Discover 页面添加） */}
      {watchlist && watchlist.length > 0 && (
        <>
          <h2>Want to Watch</h2>
          <ul className="list">
            {watchlist.map((m) => (
              <MovieItem key={m.id} movie={m} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;
import { useState } from "react";
import "./App.css";
import MovieItem from "./MovieItem";

function App() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [movies, setMovies] = useState([
  {
    id: 1,
    title: " The Legend of Hei (罗小黑战记)",
    genre: "Animation",
    rating: 9,
    image: "https://upload.wikimedia.org/wikipedia/zh/a/aa/The_Legend_of_Hei_Poster.jpg"
  },
  {
    id: 2,
    title: "Inception",
    genre: "Sci-Fi",
    rating: 8.8,
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg"
  },
  {
    id: 3,
    title: "La La Land",
    genre: "Musical",
    rating: 8.0,
    image: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg"
  },
  {
    id: 4,
    title: "Parasite",
    genre: "Thriller",
    rating: 8.6,
    image: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg"
  }
]);

  function addMovie() {
    const t = title.trim();
    if (!t) return;
    const g = genre.trim() || "Unknown";
    const r = rating === "" ? "" : Number(rating);
    if (r !== "" && (isNaN(r) || r < 0 || r > 10)) return;
    const m = { id: Date.now(), title: t, genre: g, rating: r, image: image.trim() };
    setMovies([...movies, m]);
    setTitle("");
    setGenre("");
    setRating("");
    setImage("");
  }

  return (
    <div>
      <h1>Movie Queue</h1>
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
        <button onClick={addMovie} disabled={!title.trim()}>Add</button>
      </div>

      <ul className="list">
        {movies.map((m) => (
          <MovieItem key={m.id} movie={m} />
        ))}
      </ul>
    </div>
  );
}

export default App;
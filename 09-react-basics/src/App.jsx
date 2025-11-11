import { useState } from "react";
import "./App.css";
import MovieItem from "./MovieItem";

function App() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [movies, setMovies] = useState([]);
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
}

export default App;
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Discover from "./Discover.jsx";

function App() {
  // 看过的电影（原来 Home 里的那 4 部）
  const [watchedMovies, setWatchedMovies] = useState([
    {
      id: 1,
      title: " The Legend of Hei (罗小黑战记)",
      genre: "Animation",
      rating: 9,
      image:
        "https://upload.wikimedia.org/wikipedia/zh/a/aa/The_Legend_of_Hei_Poster.jpg",
    },
    {
      id: 2,
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      image:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
    },
    {
      id: 3,
      title: "La La Land",
      genre: "Musical",
      rating: 8.0,
      image:
        "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg",
    },
    {
      id: 4,
      title: "Parasite",
      genre: "Thriller",
      rating: 8.6,
      image:
        "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg",
    },
  ]);

  // 想看的电影列表
  const [watchlist, setWatchlist] = useState([]);

  // 给 Home 用的 “添加一部已看电影”
  function handleAddWatchedMovie({ title, genre, rating, image }) {
    const t = title.trim();
    if (!t) return;

    const g = (genre || "").trim() || "Unknown";
    const r = rating === "" ? "" : Number(rating);
    if (r !== "" && (isNaN(r) || r < 0 || r > 10)) return;

    const m = {
      id: Date.now(),
      title: t,
      genre: g,
      rating: r,
      image: (image || "").trim(),
    };
    setWatchedMovies([...watchedMovies, m]);
  }

  // 给 Discover 用：把随机电影加入想看列表
  function handleAddToWatchlist(movie) {
    if (!movie) return;

    // 可选：避免重复（按标题去重）
    const exists = watchlist.some((m) => m.title === movie.title);
    if (exists) return;

    const newMovie = {
      id: Date.now(),
      title: movie.title || "Untitled",
      genre: movie.genre || "Unknown",
      rating: movie.rating ?? "",
      image: movie.image || "",
    };

    setWatchlist([...watchlist, newMovie]);
  }

  return (
    <BrowserRouter>
      {/* 简单导航栏 */}
      <nav style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/discover">Discover</NavLink>
      </nav>

      {/* 路由规则 */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              watchedMovies={watchedMovies}
              onAddWatchedMovie={handleAddWatchedMovie}
              watchlist={watchlist}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/discover"
          element={<Discover onAddToWatchlist={handleAddToWatchlist} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
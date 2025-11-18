import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";

function Discover({ onAddToWatchlist }) {
  const [suggested, setSuggested] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 从外部 API 拿一部随机动画电影
  async function fetchRandomMovie() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://api.sampleapis.com/movies/animation");
      if (!res.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No movies from API");
      }

      // 随机选一部
      const randomIndex = Math.floor(Math.random() * data.length);
      const apiMovie = data[randomIndex];

      // 转成我们自己的 movie 结构
      const movie = {
        title: apiMovie.title || "Untitled",
        genre: apiMovie.genre || "Animation",
        rating: "", // 这个 API 没有评分，就先留空
        image: apiMovie.posterURL || "",
      };

      setSuggested(movie);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // 页面第一次加载时自动请求一次
  useEffect(() => {
    fetchRandomMovie();
  }, []);

  function handleAddClick() {
    if (suggested && onAddToWatchlist) {
      onAddToWatchlist(suggested);
    }
  }

  return (
    <div>
      <h1>Discover</h1>
      <p>
        Get a random animated movie from an external API and add it to your
        "Want to Watch" list.
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={fetchRandomMovie} disabled={loading}>
          {loading ? "Loading..." : "Show Another Random Movie"}
        </button>
        <button
          onClick={handleAddClick}
          disabled={!suggested || loading}
          style={{ marginLeft: "0.5rem" }}
        >
          Add to Want to Watch
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {suggested && (
        <div>
          <h2>Suggested Movie</h2>
          <ul className="list">
            <MovieItem movie={suggested} />
          </ul>
        </div>
      )}
    </div>
  );
}

export default Discover;
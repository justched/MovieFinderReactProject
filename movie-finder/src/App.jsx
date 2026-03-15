import { useState } from "react";
import "./style.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function searchShows() {
    if (!query.trim()) {
      alert("Please enter a movie or show name.");
      return;
    }

    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      alert("Failed to fetch data.");
      console.error(error);
    }
  }

  return (
    <div className={results.length === 0 ? "center-layout" : "top-layout"}>
      
      <div className="header">
        <h1>MOVIE FINDER</h1>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchShows()}
        />
        <button onClick={searchShows}>🔍</button>
      </div>

      <div id="results">
        {results.map((item) => {
          const show = item.show;

          return (
            <div key={show.id} className="movie">
              <img
                src={
                  show.image?.medium ||
                  "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={show.name}
              />
              <h3>{show.name}</h3>
              <p>{show.rating?.average || "N/A"} ⭐</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
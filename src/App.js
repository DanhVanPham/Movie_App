import { Route, Routes } from "react-router-dom";
import "./App.css";
import Explore from "./components/Explore/Explore";
import Home from "./components/Home/Home";
import MoviePage from "./components/MoviePage/MoviePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;

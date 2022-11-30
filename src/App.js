import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FooterBar from "./Components/FooterBar";
import MainArea from "./Components/MainArea";
import Navibar from "./Components/Navbar";
import BackendModal2 from "./Components/BackendModal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TVShows from "./Components/TVShows";
import Details from "./Components/Details";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navibar />
        <Routes>
          <Route element={<MainArea />} path="/" />
          <Route element={<BackendModal2 />} path="/order" />
          <Route element={<TVShows />} path="/tv" />
          <Route element={<Details />} path="/details/:imdbID" />
        </Routes>
        <FooterBar />
      </>
    </BrowserRouter>
  );
}

export default App;

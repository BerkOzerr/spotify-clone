import { Route, Routes } from "react-router-dom";
import "./App.css";

import AllBody from "./component/AllBody";
import Artist from "./component/Artist";
import ArtistDetails from "./component/ArtistDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllBody />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/artist-details/:id" element={<ArtistDetails />} />
      </Routes>
    </>
  );
};

export default App;

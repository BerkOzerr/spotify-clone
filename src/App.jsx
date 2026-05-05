import { Route, Routes } from "react-router-dom";
import "./App.css";

import AllBody from "./component/AllBody";
import Artist from "./component/Artist";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllBody />} />
        <Route path="/artist" element={<Artist />} />
      </Routes>
    </>
  );
};

export default App;

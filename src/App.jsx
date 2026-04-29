import { Route, Routes } from "react-router-dom";
import "./App.css";

import AllBody from "./component/AllBody";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllBody />} />
      </Routes>
    </>
  );
};

export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layouts";

const App = () => (
  <div>
    <BrowserRouter>
      <Layouts />
    </BrowserRouter>
  </div>
);

export default App;

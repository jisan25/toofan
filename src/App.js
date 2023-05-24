import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import Users from "./components/Users";
import About from "./components/About";
import { useState } from "react";
import User from "./components/User";

function App() {
  const apiKey = process.env.REACT_APP_UNSPLASH_API;
  const [progress, setProgress] = useState(15);

  const updateData = (value) => {
    return setProgress(value);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar progress={progress} />}>
          <Route index element={<Users setProgress={updateData} />} />
          <Route path="/user/:id" element={<User setProgress={updateData} />} />
          <Route path="/about" element={<About setProgress={updateData} />} />
          <Route
            path="/gallery"
            element={<Gallery setProgress={updateData} apiKey={apiKey} />}
          />
          <Route path="/todos" element={<Todos setProgress={updateData} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

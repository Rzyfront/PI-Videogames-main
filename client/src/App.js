import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Landing, Home, Form, Detail, Error } from "./Components/Components.js";
import axios from "axios";
axios.defaults.baseURL =
  "https://pi-videogames-main-production-7d41.up.railway.app/";

function App() {
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error) {
      // Redirige al usuario a la página de error 404
      window.location.href = "/error";
    }
  }, [error]);
  return (
    <div className="container App">
      <Routes>
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route exact path="/" element={<Landing />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

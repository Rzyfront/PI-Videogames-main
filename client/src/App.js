import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Landing, Home, Form, Detail } from "./Components/Components.js";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <div className="container App">
      <Routes>
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;

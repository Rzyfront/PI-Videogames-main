import React from "react";
import { IoFilterCircleOutline, IoFilterCircleSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, getGenres } from "../../Redux/actions.js";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [toggleFilter, setToggleFilter] = useState();
  const Games = useSelector((state) => state.allVideogames);
  const Genres = useSelector((state) => state.allGenres);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Games) {
      dispatch(getAllVideogames());
      dispatch(getGenres());
    }
  });

  const handleSort = () => {};

  const handleRatingSort = () => {};

  const handleGenres = () => {};

  const handleFilterCreated = () => {};

  return (
    <div className="Home">
      <div className="Filters">
        <div className="filterMenu">
          {toggleFilter ? (
            <IoFilterCircleOutline
              color="fff"
              size={27}
              onClick={() => setToggleFilter(false)}
            />
          ) : (
            <IoFilterCircleSharp
              color="fff"
              size={27}
              onClick={() => setToggleFilter(true)}
            />
          )}
          {toggleFilter && (
            <div className="filterMenu-toggle">
              <div className="filters"></div>
            </div>
          )}
        </div>
      </div>

      <div className="renderCards">
        <section>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="box">
            <div className="square" style={{ "--i": "0" }}></div>
            <div className="square" style={{ "--i": "1" }}></div>
            <div className="square" style={{ "--i": "2" }}></div>
            <div className="square" style={{ "--i": "3" }}></div>
            <div className="square" style={{ "--i": "4" }}></div>
            <div className="container">
              <div className="nav">
                <div className="links">
                  <h2>NEXUS</h2>
                  <input
                    type="text"
                    name="search"
                    placeholder="Busca tus juegos favoritos aqui..."
                  />
                  <button>Buscar</button>
                </div>
              </div>
              <div className="filters">
                <NavLink>
                  <button>Crear Juego +</button>
                </NavLink>
                <div className="selectores">
                  <select onChange={(e) => handleSort(e)}>
                    <option value="Order-Alphabetical">
                      Order from the...
                    </option>
                    <option value="A-Z"> A-Z </option>
                    <option value="Z-A"> Z-A </option>
                  </select>
                  <select onChange={(e) => handleRatingSort(e)}>
                    <option value="Order-Rating">Order by rating</option>
                    <option value="Men-May">Men-May</option>
                    <option value="May-Men">May-Men</option>
                  </select>
                  <select onChange={(e) => handleGenres(e)}>
                    <option value="All">Genres</option>
                    {Genres?.map((el) => (
                      <option key={el.id} value={el.name}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                  <select onChange={(e) => handleFilterCreated(e)}>
                    <option value="All">All</option>
                    <option value="Created">Created in DB</option>
                    <option value="Existing">From the API</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

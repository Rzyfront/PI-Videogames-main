import React from "react";
// import { IoFilterCircleOutline, IoFilterCircleSharp } from "react-icons/io5";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  getGenres,
  getVideogameByName,
  reFilter,
} from "../../Redux/actions.js";
import { NavLink } from "react-router-dom";
import Card from "../Card/Card";
import "./Home.css";
import { Loading } from "../Loading/Loading";

const Home = () => {
  // const [toggleFilter, setToggleFilter] = useState();
  const Genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const Filters = useSelector((state) => state.filters);
  const gamesPerPage = 15;
  const pagesCount = Math.ceil(Filters.length / gamesPerPage);
  const [filtros, setFiltros] = useState({
    alphabetic: "none",
    rating: "none",
    origin: "none",
    genre: "none",
  });
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!Filters || Filters.length === 0) {
      dispatch(getAllVideogames());
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!Genres || Genres.length === 0) {
      dispatch(getGenres());
    }
  }, [Genres]);

  useEffect(() => {
    dispatch(reFilter(filtros));
  }, [filtros]);

  const handlePageChange = (increment) => {
    const nextPage = currentPage + increment;
    if (nextPage >= 0 && nextPage < pagesCount) {
      setLoading(true);
      setCurrentPage(nextPage);
      setActivePage(nextPage);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };

  const gamesToRender = Filters.slice(
    currentPage * gamesPerPage,
    (currentPage + 1) * gamesPerPage
  );

  const renderNavigationButtons = () => {
    return (
      <div className="pag-container">
        <AiOutlineArrowLeft
          className="pag-btn arrows"
          onClick={() => handlePageChange(-1)}
        />
        {renderPageNumbers()}
        <AiOutlineArrowRight
          className="pag-btn arrows"
          onClick={() => handlePageChange(1)}
        />
      </div>
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i);

    return (
      <ul className="numbers">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              key={pageNumber}
              className={`pag-btn ${activePage === pageNumber ? "active" : ""}`}
              onClick={() => {
                if (pageNumber !== currentPage) {
                  setLoading(true);
                  setCurrentPage(pageNumber);
                  setActivePage(pageNumber);
                  setTimeout(() => {
                    setLoading(false);
                  }, 600);
                }
              }}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const renderGames = () => {
    return gamesToRender.map((game) => {
      return (
        <Card
          key={game.id}
          id={game.id}
          name={game.name}
          image={game.background_image}
          genres={game.genres}
        />
      );
    });
  };

  const handleFilters = (event) => {
    const { value, name } = event.target;
    if (filtros[name] !== value) {
      setFiltros({
        ...filtros,
        [name]: value,
      });
      setLoading(true);
      setCurrentPage(0);
      setActivePage(0);
      setTimeout(() => {
        setLoading(false);
      }, 400);

      dispatch(reFilter(filtros));
    }
  };

  const inputHandler = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  const handleSearch = () => {
    if (name !== "") {
      dispatch(getVideogameByName(name));
      setLoading(true);
      setCurrentPage(0);
      setActivePage(0);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  return (
    <div className="Home">
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
                    onChange={inputHandler}
                  />
                  <button onClick={handleSearch}>
                    Buscar
                    <BiSearchAlt className="lupita" />
                  </button>
                </div>
              </div>

              <div className="filters">
                <NavLink to={"/create"}>
                  <button
                    onClick={() => {
                      dispatch(getVideogameByName());
                    }}
                  >
                    Crear Juego +
                  </button>
                </NavLink>
                <div className="selectores">
                  <select
                    onChange={(e) => handleFilters(e)}
                    name="alphabetic"
                    value={filtros.alphabetic}
                  >
                    <option value="none">Alfabeticamente</option>
                    <option value="asc"> A-Z </option>
                    <option value="desc"> Z-A </option>
                  </select>
                  <select
                    onChange={(e) => handleFilters(e)}
                    name="rating"
                    value={filtros.rating}
                  >
                    <option value="none">Ordena por rating</option>
                    <option value="desc">Mas populares</option>
                    <option value="asc">Menos populares</option>
                  </select>
                  <select
                    onChange={(e) => handleFilters(e)}
                    name="genre"
                    value={filtros.genre}
                  >
                    <option value="All">Ordena por generos</option>
                    {Genres?.map((el, index) => (
                      <option key={index} value={el.name}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) => handleFilters(e)}
                    name="origin"
                    value={filtros.origin}
                  >
                    <option value="none">Origen</option>
                    <option value="none">All</option>
                    <option value="db">Juegos Creados</option>
                    <option value="api">Juegos API</option>
                  </select>
                </div>
              </div>

              <div className="paginado">{renderNavigationButtons()}</div>

              <div className="cajon">
                {loading ? (
                  <div className="loading">
                    <Loading />
                  </div>
                ) : (
                  renderGames()
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

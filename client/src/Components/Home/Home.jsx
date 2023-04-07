import React from "react";
import { Loading } from "../Loading/Loading.jsx";
import { BsArrowLeftSquare } from "react-icons/bs";
import { BsArrowRightSquare } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiRefreshFill } from "react-icons/ri";
import { CgCloseR } from "react-icons/cg";
import { ImMenu } from "react-icons/im";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Card from "../Card/Card.jsx";
import logo from "../../Assets/Nexus.svg";
import {
  getAllVideogames,
  getGenres,
  getVideogameByName,
  Filter,
} from "../../Redux/actions.js";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state);
  const { gamesShown } = useSelector((state) => state);
  const gamesPerPage = 15;
  const pagesCount = Math.ceil(gamesShown.length / gamesPerPage);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [filters, setFilters] = useState({
    alphabetic: "none",
    rating: "none",
    origin: "none",
    genre: "none",
  });
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState("");
  const [gamesToRender, setGamesToRender] = useState([]);

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

  const renderNavigationButtons = () => {
    return (
      <div className="pag-container">
        <BsArrowLeftSquare
          className="pag-btn arrows"
          onClick={() => handlePageChange(-1)}
        />
        {renderPageNumbers()}
        <BsArrowRightSquare
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
    return gamesToRender?.map((game) => {
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

  const movilMenu = () => {
    return (
      <div className="movilMenu">
        <div className="selectoresMovil">
          <select
            onChange={(e) => handleFilters(e)}
            name="alphabetic"
            value={filters.alphabetic}
          >
            <option value="none">Alfabeticamente</option>
            <option value="asc"> A-Z </option>
            <option value="desc"> Z-A </option>
          </select>
          <select
            onChange={(e) => handleFilters(e)}
            name="rating"
            value={filters.rating}
          >
            <option value="none">Ordena por rating</option>
            <option value="desc">Mas populares</option>
            <option value="asc">Menos populares</option>
          </select>
          <select
            onChange={(e) => handleFilters(e)}
            name="genre"
            value={filters.genre}
          >
            <option value="none">Ordena por generos</option>
            {genres?.map((el, index) => (
              <option key={index} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => handleFilters(e)}
            name="origin"
            value={filters.origin}
          >
            <option value="none">Origen</option>
            <option value="none">All</option>
            <option value="db">Juegos Creados</option>
            <option value="api">Juegos API</option>
          </select>
        </div>
      </div>
    );
  };

  const restaurarFilter = () => {
    dispatch(getAllVideogames());
    setFilters({
      alphabetic: "none",
      rating: "none",
      origin: "none",
      genre: "none",
    });
    setGamesToRender([]);
    setLoading(true);
    setCurrentPage(0);
    setActivePage(0);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleFilters = (event) => {
    const { value, name } = event.target;
    if (filters[name] !== value) {
      setFilters({ ...filters, [name]: value });
      dispatch(Filter(filters));
      setLoading(true);
      setCurrentPage(0);
      setActivePage(0);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const inputHandler = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    if (name !== "") {
      dispatch(getVideogameByName(name));
      setGamesToRender([]);
      setLoading(true);
      setCurrentPage(0);
      setActivePage(0);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!gamesShown || gamesShown.length === 0) {
      dispatch(getAllVideogames());
    } else {
      setGamesToRender(
        gamesShown.slice(
          currentPage * gamesPerPage,
          (currentPage + 1) * gamesPerPage
        )
      );
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [gamesShown, dispatch, currentPage]);

  useEffect(() => {
    if (!genres || genres.length === 0) {
      dispatch(getGenres());
    }
  }, [genres, dispatch]);

  useEffect(() => {
    dispatch(Filter(filters));
  }, [filters, dispatch]);

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
            <div className="containerhome">
              <div className="nav">
                <div className="header">
                  <NavLink to={"/"}>
                    <div className="logos">
                      <img src={logo} alt="Nexus_Logo" width="35px" />
                      <h2>NEXUS</h2>
                    </div>
                  </NavLink>
                  <div className="inputButton">
                    <input
                      type="text"
                      name="search"
                      placeholder="Busca tus juegos favoritos aqui..."
                      onChange={inputHandler}
                    />
                    <button onClick={handleSearch}>
                      Buscar
                      <BiSearchAlt />
                    </button>
                  </div>
                </div>
              </div>

              <div className="filters">
                <div className="buttons">
                  <NavLink to={"/create"}>
                    <button className="creategame">Crear Juego +</button>
                  </NavLink>
                  <button onClick={restaurarFilter} className="desearch">
                    <RiRefreshFill />
                  </button>
                </div>
                <div className="selectores">
                  <select
                    onChange={(e) => handleFilters(e)}
                    name="alphabetic"
                    value={filters.alphabetic}
                  >
                    <option value="none">Alfabeticamente</option>
                    <option value="asc"> A-Z </option>
                    <option value="desc"> Z-A </option>
                  </select>
                  <select
                    onChange={(e) => handleFilters(e)}
                    name="rating"
                    value={filters.rating}
                  >
                    <option value="none">Ordena por rating</option>
                    <option value="desc">Mas populares</option>
                    <option value="asc">Menos populares</option>
                  </select>
                  <select
                    onChange={(e) => handleFilters(e)}
                    name="genre"
                    value={filters.genre}
                  >
                    <option value="none">Ordena por generos</option>
                    {genres?.map((el, index) => (
                      <option key={index} value={el.name}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) => handleFilters(e)}
                    name="origin"
                    value={filters.origin}
                  >
                    <option value="none">Origen</option>
                    <option value="none">All</option>
                    <option value="db">Juegos Creados</option>
                    <option value="api">Juegos API</option>
                  </select>
                </div>
                {!toggleMenu ? (
                  <ImMenu
                    className="menuOff"
                    onClick={() => {
                      setToggleMenu(true);
                    }}
                  />
                ) : (
                  <CgCloseR
                    className="menuOn"
                    onClick={() => setToggleMenu(false)}
                  />
                )}
                {toggleMenu && movilMenu()}
              </div>

              <div className="cajon">
                {loading ? (
                  <div className="loading">
                    <Loading />
                  </div>
                ) : (
                  renderGames()
                )}
              </div>
              <div className="paginado">{renderNavigationButtons()}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

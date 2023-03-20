import React from "react";
// import { IoFilterCircleOutline, IoFilterCircleSharp } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, getGenres } from "../../Redux/actions.js";
import { NavLink } from "react-router-dom";
import Card from "../Card/Card";
import "./Home.css";

const Home = () => {
  // const [toggleFilter, setToggleFilter] = useState();
  // const [filtros, setFiltros] = useState([]);
  // const Filters = useSelector((state) => state.filters);
  const Games = useSelector((state) => state.allVideogames);
  const Genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const gamesPerPage = 15; // Cantidad de juegos por página
  const pagesCount = Math.ceil(Games.length / gamesPerPage); // Cantidad de páginas
  const [currentPage, setCurrentPage] = useState(0); // Índice de la página actual

  useEffect(() => {
    if (!Games) {
      dispatch(getAllVideogames());
      dispatch(getGenres());
    }
  });

  const handlePageChange = (increment) => {
    const nextPage = currentPage + increment;
    if (nextPage >= 0 && nextPage < pagesCount) {
      setCurrentPage(nextPage);
    }
  };

  const gamesToRender = Games.slice(
    currentPage * gamesPerPage,
    (currentPage + 1) * gamesPerPage
  );

  const renderNavigationButtons = () => {
    return (
      <div>
        <AiOutlineArrowLeft onClick={() => handlePageChange(-1)} />
        <span>{`Página ${currentPage + 1} de ${pagesCount}`}</span>
        <AiOutlineArrowRight onClick={() => handlePageChange(1)} />
      </div>
    );
  };
  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i);
    return (
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button onClick={() => setCurrentPage(pageNumber)}>
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
          name={game.name}
          image={game.image}
          genres={game.genres}
        />
      );
    });
  };

  const handleSort = () => {};

  const handleRatingSort = () => {};

  const handleGenres = () => {};

  const handleFilterCreated = () => {};

  return (
    <div className="Home">
      {/* <div className="Filters">
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
      </div> */}

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
                  <button>
                    Buscar
                    <BiSearchAlt className="lupita" />
                  </button>
                </div>
              </div>

              <div className="filters">
                <NavLink to={'/create'}>
                  <button>Crear Juego +</button>
                </NavLink>
                <div className="selectores">
                  <select onChange={(e) => handleSort(e)}>
                    <option value="Order-Alphabetical">Alfabeticamente</option>
                    <option value="asc"> A-Z </option>
                    <option value="des"> Z-A </option>
                  </select>
                  <select onChange={(e) => handleRatingSort(e)}>
                    <option value="Order-Rating">Ordena por rating</option>
                    <option value="asc">Mas populares</option>
                    <option value="des">Menos populares</option>
                  </select>
                  <select onChange={(e) => handleGenres(e)}>
                    <option value="All">Ordena por generos</option>
                    {Genres?.map((el) => (
                      <option key={el.id} value={el.name}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                  <select onChange={(e) => handleFilterCreated(e)}>
                    <option value="All">All</option>
                    <option value="Created">Juegos Creados</option>
                    <option value="Existing">Juegos API</option>
                  </select>
                </div>
              </div>

              <div className="paginado">
                {renderNavigationButtons()}
                {renderPageNumbers()}
              </div>

              <div className="cajon">{renderGames()}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import "./Form.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  getGenres,
  postVideogames,
} from "../../Redux/actions";
import { NavLink } from "react-router-dom";
import { validate } from "./validate";
import { Loading } from "../Loading/Loading";

const Form = () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) =>
    state.allVideogames
      .map((game) =>
        Array.isArray(game.platforms)
          ? game.platforms.map((p) => p.platform.name)
          : []
      )
      .flat()
  );
  const [create, setCreate] = useState(false);
  let uniquePlatforms = [...new Set(platforms)];
  const genres = useSelector((state) => state.genres);
  const [loading, setLoading] = useState(true);
  const [empy, setEmpy] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    platforms: [],
    description: "",
    released: "",
    rating: 0,
    image: "",
    genres: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    !platforms || dispatch(getAllVideogames());
    dispatch(getGenres());
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      if (
        inputs.name !== "" &&
        inputs.platforms.length > 0 &&
        inputs.description !== "" &&
        inputs.released !== "" &&
        inputs.rating !== 0 &&
        inputs.image !== "" &&
        inputs.genres.length > 0
      ) {
        setLoading(true);
        let formatPlatforms = inputs.platforms.map((p) => {
          return {
            platform: {
              name: p,
            },
          };
        });

        let formatGenres = inputs.genres.map((genreName) => {
          const matchingGenre = genres.find(
            (genre) => genre.name === genreName
          );
          return matchingGenre ? matchingGenre.id : null;
        });
        let gamePost = {
          name: inputs.name,
          description: inputs.description,
          platforms: formatPlatforms,
          background_image: inputs.image,
          released: inputs.released,
          rating: Number(inputs.rating),
          genres: formatGenres,
        };
        dispatch(postVideogames(gamePost));
        setInputs({
          name: "",
          platforms: [],
          description: "",
          released: "",
          rating: 0,
          image: "",
          genres: [],
        });
        setTimeout(() => {
          setLoading(false);
          setCreate(true);
        }, 500);
      } else {
        setEmpy(true);
      }
    }
  };
  function handleInputChange(event) {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrors(
      validate({
        ...inputs,
        [name]: value,
      })
    );
  }

  const handleSelectorChange = (event) => {
    const { name, value } = event.target;

    setInputs({
      ...inputs,
      [name]: [value, ...inputs[name]],
    });
  };

  const removePlatform = (platform) => {
    const filterPlatform = inputs.platforms.filter((p) => p !== platform);
    setInputs({
      ...inputs,
      platforms: filterPlatform,
    });
  };

  const removeGenre = (genre) => {
    const filterGenre = inputs.genres.filter((g) => g !== genre);
    setInputs({
      ...inputs,
      genres: filterGenre,
    });
  };

  const empyMessage = () => {
    return (
      <div className="empy">
        <div className="empyMessage">
          <h4>Completa los campos obligatorios para crear un juego</h4>
          <button onClick={() => setEmpy(false)}>OK</button>
        </div>
      </div>
    );
  };

  const createMessage = () => {
    return (
      <div className="create">
        <div className="createMessage">
          <h4>Juego Creado Exitosamente</h4>
          <NavLink to={"/home"}>
            <button onClick={() => setCreate(false)}>OK</button>
          </NavLink>
        </div>
      </div>
    );
  };
  return (
    <div className="From">
      {empy && empyMessage()}
      {create && createMessage()}
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
            {loading ? (
              <Loading />
            ) : (
              <form id="formcreate" onSubmit={handleSubmit}>
                <h2 className="title">Crea tu juego</h2>

                <div className="inputs">
                  <label
                    htmlFor="name"
                    style={{ color: errors.name ? "#f00" : "" }}
                  >
                    {errors.name && `Nombre ${errors.name}*`}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ingresa el nombre del juego:"
                    value={inputs.name}
                    onChange={handleInputChange}
                  />

                  <select
                    name="platforms"
                    id="platforms"
                    value={inputs.platforms[0]}
                    onChange={handleSelectorChange}
                  >
                    <option key="defaul">Selecciona las plataformas:</option>
                    {inputs.platforms.length < 9 &&
                      uniquePlatforms
                        .filter(
                          (platform) => !inputs.platforms.includes(platform)
                        )
                        .map((platform, index) => {
                          return <option key={index}>{platform}</option>;
                        })}
                  </select>
                  <div className="platformsTarget">
                    {inputs?.platforms?.map((platform, index) => {
                      return (
                        <div key={index}>
                          <h3 onClick={() => removePlatform(platform)}>x</h3>
                          <h4>{platform} </h4>
                        </div>
                      );
                    })}
                  </div>

                  <select
                    name="genres"
                    id="genres"
                    value={inputs.genres[0]}
                    onChange={handleSelectorChange}
                  >
                    <option key="defaul">Selecciona los generos:</option>
                    {inputs.genres.length < 4 &&
                      genres
                        .filter((genre) => !inputs.genres.includes(genre.name))
                        .map((genre, index) => {
                          return <option key={index}>{genre.name}</option>;
                        })}
                  </select>
                  <div className="genresTarget">
                    {inputs.genres &&
                      inputs?.genres?.map((genre, index) => {
                        return (
                          <div key={index}>
                            <h3 onClick={() => removeGenre(genre)}>x</h3>
                            <h4>{genre} </h4>
                          </div>
                        );
                      })}
                  </div>
                  <label
                    htmlFor="image"
                    style={{ color: errors.image ? "#f00" : "" }}
                  >
                    {errors.image && `Imagen ${errors.image}*`}
                  </label>

                  <input
                    type="text"
                    name="image"
                    placeholder="Ingresa URL de la imagen:"
                    value={inputs.image}
                    onChange={handleInputChange}
                  />

                  <input
                    type="date"
                    name="released"
                    placeholder="date"
                    value={inputs.released}
                    onChange={handleInputChange}
                  />
                  <div className="range">
                    <input
                      type="range"
                      name="rating"
                      min="0"
                      max="5"
                      step="0.1"
                      value={inputs.rating}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="range">Rating: {inputs.rating}</label>
                  </div>

                  <label
                    htmlFor="textarea"
                    style={{ color: errors.description ? "#f00" : "" }}
                  >
                    {errors.description && `Descripcion ${errors.description}*`}
                  </label>
                  <textarea
                    placeholder="Ingresa una description de tu juego aquí"
                    name="description"
                    rows="5"
                    value={inputs.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="botones">
                  <NavLink to={"/home"}>
                    <button>Volver</button>
                  </NavLink>
                  <button type="submit">Crear Juego +</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;

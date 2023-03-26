const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

//!---------------- VIDEOGAMES CONTROLLER-----------------------------

const getVideogames = async () => {
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=`;
  let apiGames = [];
  let page = 1;
  while (apiGames.length !== 100) {
    let result = await axios(`${url}${page}`);
    apiGames = [...apiGames, ...result.data.results];
    ++page;
  }

  apiGames = apiGames.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      platforms: game.platforms,
      origin: "api",
      rating: game.rating,
    };
  });

  const dbGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const Games = [...apiGames, ...dbGames];

  let formatGames = Games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      platforms: game.platforms,
      origin: game.origin,
      rating: game.rating,
    };
  });

  if (!formatGames) {
    throw Error("No se encontraron video juegos");
  }
  return formatGames;
};

const createVideogame = async (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres
) => {
  if (
    !name ||
    !description ||
    !platforms ||
    !background_image ||
    !released ||
    !rating ||
    !genres
  ) {
    throw Error("No existen los campos necesarios para crear un juego");
  }

  const newGame = await Videogame.create({
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
  });
  //AGREGAR RELACION
  await newGame.addGenre(genres);

  return newGame;
};

const getGameDetail = async (idVideogame) => {
  try {
    const dbGame = await Videogame.findByPk(idVideogame, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (dbGame) {
      return {
        id: dbGame.id,
        name: dbGame.name,
        description: dbGame.description,
        platforms: dbGame.platforms,
        background_image: dbGame.background_image,
        released: dbGame.released,
        rating: dbGame.rating,
        genres: dbGame.genres,
      };
    } else {
      throw new Error("Eso no es un juego, es un burro");
    }
  } catch (error) {
    const url = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
    const apiGame = await axios(url);
    if (Object.keys(apiGame.data).length !== 0) {
      return {
        id: apiGame.data.id,
        name: apiGame.data.name,
        description: apiGame.data.description,
        platforms: apiGame.data.platforms,
        background_image: apiGame.data.background_image,
        released: apiGame.data.released,
        rating: apiGame.data.rating,
        genres: apiGame.data.genres,
      };
    } else {
      throw new Error("Juego no encontrado");
    }
  }
};

const getGameByName = async (name) => {
  let games = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  games = games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      origin: game.origin,
      rating: game.rating,
      origin: db,
    };
  });

  const url = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`;
  const apiGame = await axios(url);
  let results = apiGame.data.results;
  results = results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      rating: game.rating,
      origin: "api",
    };
  });

  if (games.length > 0 && results.length > 0) {
    let allGamesByName = [...games, ...results];
    return allGamesByName;
  } else if (games.length === 0 && results.length > 0) {
    return results;
  } else if (games.length > 0 && results.length === 0) {
    return games;
  } else {
    throw new Error("No se encontró el juego");
  }
};

//!---------------- GENRES CONTROLLER-----------------------------

const getAllGenres = async () => {
  const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
  const getGenres = await axios(url);
  const allGenres = getGenres.data.results.map((genre) => genre.name);

  allGenres.map(async (genre) => {
    await Genre.findOrCreate({
      where: { name: genre },
    });
  });

  const gameGenres = await Genre.findAll();
  if (gameGenres.length) {
    return gameGenres;
  } else {
    throw new Error("Holis soy un error");
  }
};

module.exports = {
  getVideogames,
  createVideogame,
  getGameDetail,
  getGameByName,
  getAllGenres,
};

// {
//       "id": 3498,
//       "slug": "grand-theft-auto-v",
//       "name": "Grand Theft Auto V",
//       "released": "2013-09-17",
//       "tba": false,
//       "background_image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
//       "rating": 4.47,
//       "rating_top": 5,
//       "ratings": [
//         {
//           "id": 5,
//           "title": "exceptional",
//           "count": 3719,
//           "percent": 59.04
//         },
//         {
//           "id": 4,
//           "title": "recommended",
//           "count": 2068,
//           "percent": 32.83
//         },
//         {
//           "id": 3,
//           "title": "meh",
//           "count": 398,
//           "percent": 6.32
//         },
//         {
//           "id": 1,
//           "title": "skip",
//           "count": 114,
//           "percent": 1.81
//         }
//       ],
//       "ratings_count": 6214,
//       "reviews_text_count": 47,
//       "added": 19034,
//       "added_by_status": {
//         "yet": 494,
//         "owned": 11023,
//         "beaten": 5300,
//         "toplay": 554,
//         "dropped": 986,
//         "playing": 677
//       },
//       "metacritic": 92,
//       "playtime": 73,
//       "suggestions_count": 412,
//       "updated": "2023-03-14T14:32:19",
//       "user_game": null,
//       "reviews_count": 6299,
//       "saturated_color": "0f0f0f",
//       "dominant_color": "0f0f0f",
//       "platforms": [
//         {
//           "platform": {
//             "id": 187,
//             "name": "PlayStation 5",
//             "slug": "playstation5",
//             "image": null,
//             "year_end": null,
//             "year_start": 2020,
//             "games_count": 819,
//             "image_background": "https://media.rawg.io/media/games/d89/d89bd0cf4fcdc10820892980cbba0f49.jpg"
//           },
//           "released_at": "2013-09-17",
//           "requirements_en": null,
//           "requirements_ru": null
//         },
//         {
//           "platform": {
//             "id": 186,
//             "name": "Xbox Series S/X",
//             "slug": "xbox-series-x",
//             "image": null,
//             "year_end": null,
//             "year_start": 2020,
//             "games_count": 730,
//             "image_background": "https://media.rawg.io/media/games/d47/d479582ed0a46496ad34f65c7099d7e5.jpg"
//           },
//           "released_at": "2013-09-17",
//           "requirements_en": null,
//           "requirements_ru": null
//         },
//         {
//           "platform": {
//             "id": 18,
//             "name": "PlayStation 4",
//             "slug": "playstation4",
//             "image": null,
//             "year_end": null,
//             "year_start": null,
//             "games_count": 6590,
//             "image_background": "https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg"
//           },
//           "released_at": "2013-09-17",
//           "requirements_en": null,
//           "requirements_ru": null
//         },
//         {
//           "platform": {
//             "id": 4,
//             "name": "PC",
//             "slug": "pc",
//             "image": null,
//             "year_end": null,
//             "year_start": null,
//             "games_count": 534735,
//             "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
//           },
//           "released_at": "2013-09-17",
//           "requirements_en": {
//             "minimum": "Minimum:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Windows Vista 64 Bit Service Pack 2* (*NVIDIA video card recommended if running Vista OS)Processor: Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHzMemory: 4 GB RAMGraphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)Storage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes: Over time downloadable content and programming changes will change the system requirements for this game.  Please refer to your hardware manufacturer and www.rockstargames.com/support for current compatibility information. Some system components such as mobile chipsets, integrated, and AGP graphics cards may be incompatible. Unlisted specifications may not be supported by publisher.     Other requirements:  Installation and online play requires log-in to Rockstar Games Social Club (13+) network; internet connection required for activation, online play, and periodic entitlement verification; software installations required including Rockstar Games Social Club platform, DirectX , Chromium, and Microsoft Visual C++ 2008 sp1 Redistributable Package, and authentication software that recognizes certain hardware attributes for entitlement, digital rights management, system, and other support purposes.     SINGLE USE SERIAL CODE REGISTRATION VIA INTERNET REQUIRED; REGISTRATION IS LIMITED TO ONE ROCKSTAR GAMES SOCIAL CLUB ACCOUNT (13+) PER SERIAL CODE; ONLY ONE PC LOG-IN ALLOWED PER SOCIAL CLUB ACCOUNT AT ANY TIME; SERIAL CODE(S) ARE NON-TRANSFERABLE ONCE USED; SOCIAL CLUB ACCOUNTS ARE NON-TRANSFERABLE.  Partner Requirements:  Please check the terms of service of this site before purchasing this software.",
//             "recommended": "Recommended:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1Processor: Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)Memory: 8 GB RAMGraphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GBStorage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes:"
//           },
//           "requirements_ru": null
//         },
//         {
//           "platform": {
//             "id": 16,
//             "name": "PlayStation 3",
//             "slug": "playstation3",
//             "image": null,
//             "year_end": null,
//             "year_start": null,
//             "games_count": 3301,
//             "image_background": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg"
//           },
//           "released_at": "2013-09-17",
//           "requirements_en": null,
//           "requirements_ru": null
//         },
//         {
//           "platform": {
//             "id": 14,
//             "name": "Xbox 360",
//             "slug": "xbox360",
//             "image": null,
//             "year_end": null,
//             "year_start": null,
//             "games_count": 2780,
//             "image_background": "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg"
//           },
//           "released_at": "2013-09-17",
//           "requirements_en": null,
//           "requirements_ru": null
//         },
//         {
//           "platform": {
//             "id": 1,
//             "name": "Xbox One",
//             "slug": "xbox-one",
//             "image": null,
//             "year_end": null,
//             "year_start": null,
//             "games_count": 5485,
//             "image_background": "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg"
//           },
//           "released_at": "2013-09-17",
//           "requirements_en": null,
//           "requirements_ru": null
//         }
//       ],
//       "parent_platforms": [
//         {
//           "platform": {
//             "id": 1,
//             "name": "PC",
//             "slug": "pc"
//           }
//         },
//         {
//           "platform": {
//             "id": 2,
//             "name": "PlayStation",
//             "slug": "playstation"
//           }
//         },
//         {
//           "platform": {
//             "id": 3,
//             "name": "Xbox",
//             "slug": "xbox"
//           }
//         }
//       ],
//       "genres": [
//         {
//           "id": 4,
//           "name": "Action",
//           "slug": "action",
//           "games_count": 177258,
//           "image_background": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
//         },
//         {
//           "id": 3,
//           "name": "Adventure",
//           "slug": "adventure",
//           "games_count": 136263,
//           "image_background": "https://media.rawg.io/media/games/9aa/9aa42d16d425fa6f179fc9dc2f763647.jpg"
//         }
//       ],
//       "stores": [
//         {
//           "id": 290375,
//           "store": {
//             "id": 3,
//             "name": "PlayStation Store",
//             "slug": "playstation-store",
//             "domain": "store.playstation.com",
//             "games_count": 7796,
//             "image_background": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
//           }
//         },
//         {
//           "id": 438095,
//           "store": {
//             "id": 11,
//             "name": "Epic Games",
//             "slug": "epic-games",
//             "domain": "epicgames.com",
//             "games_count": 1214,
//             "image_background": "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg"
//           }
//         },
//         {
//           "id": 290376,
//           "store": {
//             "id": 1,
//             "name": "Steam",
//             "slug": "steam",
//             "domain": "store.steampowered.com",
//             "games_count": 72856,
//             "image_background": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
//           }
//         },
//         {
//           "id": 290377,
//           "store": {
//             "id": 7,
//             "name": "Xbox 360 Store",
//             "slug": "xbox360",
//             "domain": "marketplace.xbox.com",
//             "games_count": 1914,
//             "image_background": "https://media.rawg.io/media/games/e2d/e2d3f396b16dded0f841c17c9799a882.jpg"
//           }
//         },
//         {
//           "id": 290378,
//           "store": {
//             "id": 2,
//             "name": "Xbox Store",
//             "slug": "xbox-store",
//             "domain": "microsoft.com",
//             "games_count": 4756,
//             "image_background": "https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg"
//           }
//         }
//       ],
//       "clip": null,
//       "tags": [
//         {
//           "id": 31,
//           "name": "Singleplayer",
//           "slug": "singleplayer",
//           "language": "eng",
//           "games_count": 208470,
//           "image_background": "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg"
//         },
//         {
//           "id": 40847,
//           "name": "Steam Achievements",
//           "slug": "steam-achievements",
//           "language": "eng",
//           "games_count": 29335,
//           "image_background": "https://media.rawg.io/media/games/9dd/9ddabb34840ea9227556670606cf8ea3.jpg"
//         },
//         {
//           "id": 7,
//           "name": "Multiplayer",
//           "slug": "multiplayer",
//           "language": "eng",
//           "games_count": 35496,
//           "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
//         },
//         {
//           "id": 40836,
//           "name": "Full controller support",
//           "slug": "full-controller-support",
//           "language": "eng",
//           "games_count": 13786,
//           "image_background": "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg"
//         },
//         {
//           "id": 13,
//           "name": "Atmospheric",
//           "slug": "atmospheric",
//           "language": "eng",
//           "games_count": 29223,
//           "image_background": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
//         },
//         {
//           "id": 42,
//           "name": "Great Soundtrack",
//           "slug": "great-soundtrack",
//           "language": "eng",
//           "games_count": 3230,
//           "image_background": "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg"
//         },
//         {
//           "id": 24,
//           "name": "RPG",
//           "slug": "rpg",
//           "language": "eng",
//           "games_count": 16695,
//           "image_background": "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg"
//         },
//         {
//           "id": 18,
//           "name": "Co-op",
//           "slug": "co-op",
//           "language": "eng",
//           "games_count": 9648,
//           "image_background": "https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg"
//         },
//         {
//           "id": 36,
//           "name": "Open World",
//           "slug": "open-world",
//           "language": "eng",
//           "games_count": 6203,
//           "image_background": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg"
//         },
//         {
//           "id": 411,
//           "name": "cooperative",
//           "slug": "cooperative",
//           "language": "eng",
//           "games_count": 3905,
//           "image_background": "https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg"
//         },
//         {
//           "id": 8,
//           "name": "First-Person",
//           "slug": "first-person",
//           "language": "eng",
//           "games_count": 28934,
//           "image_background": "https://media.rawg.io/media/games/c24/c24ec439abf4a2e92f3429dfa83f7f94.jpg"
//         },
//         {
//           "id": 149,
//           "name": "Third Person",
//           "slug": "third-person",
//           "language": "eng",
//           "games_count": 9228,
//           "image_background": "https://media.rawg.io/media/games/951/951572a3dd1e42544bd39a5d5b42d234.jpg"
//         },
//         {
//           "id": 4,
//           "name": "Funny",
//           "slug": "funny",
//           "language": "eng",
//           "games_count": 22903,
//           "image_background": "https://media.rawg.io/media/games/e04/e04963f3ac4c4fa83a1dc0b9231e50db.jpg"
//         },
//         {
//           "id": 37,
//           "name": "Sandbox",
//           "slug": "sandbox",
//           "language": "eng",
//           "games_count": 5929,
//           "image_background": "https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg"
//         },
//         {
//           "id": 123,
//           "name": "Comedy",
//           "slug": "comedy",
//           "language": "eng",
//           "games_count": 10865,
//           "image_background": "https://media.rawg.io/media/games/ffe/ffed87105b14f5beff72ff44a7793fd5.jpg"
//         },
//         {
//           "id": 150,
//           "name": "Third-Person Shooter",
//           "slug": "third-person-shooter",
//           "language": "eng",
//           "games_count": 2871,
//           "image_background": "https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
//         },
//         {
//           "id": 62,
//           "name": "Moddable",
//           "slug": "moddable",
//           "language": "eng",
//           "games_count": 774,
//           "image_background": "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg"
//         },
//         {
//           "id": 144,
//           "name": "Crime",
//           "slug": "crime",
//           "language": "eng",
//           "games_count": 2539,
//           "image_background": "https://media.rawg.io/media/games/d73/d7364906c530ccc2d89b0b5d8695e03c.jpg"
//         },
//         {
//           "id": 62349,
//           "name": "vr mod",
//           "slug": "vr-mod",
//           "language": "eng",
//           "games_count": 17,
//           "image_background": "https://media.rawg.io/media/screenshots/1bb/1bb3f78f0fe43b5d5ca2f3da5b638840.jpg"
//         }
//       ],
//       "esrb_rating": {
//         "id": 4,
//         "name": "Mature",
//         "slug": "mature"
//       },
//       "short_screenshots": [
//         {
//           "id": -1,
//           "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg"
//         },
//         {
//           "id": 1827221,
//           "image": "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg"
//         },
//         {
//           "id": 1827222,
//           "image": "https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg"
//         },
//         {
//           "id": 1827223,
//           "image": "https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg"
//         },
//         {
//           "id": 1827225,
//           "image": "https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg"
//         },
//         {
//           "id": 1827226,
//           "image": "https://media.rawg.io/media/screenshots/a7e/a7e990bc574f4d34e03b5926361d1ee7.jpg"
//         },
//         {
//           "id": 1827227,
//           "image": "https://media.rawg.io/media/screenshots/592/592e2501d8734b802b2a34fee2df59fa.jpg"
//         }
//       ]
//     },

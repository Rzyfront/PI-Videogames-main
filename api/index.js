//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//INDEX DEL SERVER
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { PORT } = process.env;
// SINCRONIZACION CON LA BD
// FALSE NO BORRA TABLAS
// TRUE BORRA Y CREA NUEVAMENTE LAS TABLAS, SIRVE PARA DESARROLLO
conn.sync({ force: false }).then(() => {
  server.listen(PORT || 3001, () => {
    console.log(`%s listo en puerto ${PORT || 3001}`); // eslint-disable-line no-console
  });
});

//para poder ejecutar este codigo en la terminar debo ingresar y posicionarme sobre la carpeta donde se almacena el js
//y ingresar el comando node veri... el nombre del js
const axios = require("axios");

axios
  .get("https://laboratorio3-f36a.restdb.io/rest/", {
    headers: {
      "x-apikey": "64bdbb6f86d8c5e18ded91e3",
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error al hacer la solicitud:", error);
  });
// servidor node_modules/.bin/vue-cli-service serve

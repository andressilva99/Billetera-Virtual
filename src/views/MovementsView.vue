<template>
  <div class="home">
    <NavBar />
    
    <div class="container">
      <div class="layout">
        <div>
          <h2>Historial de Movimientos</h2>
          <div v-if="movimientos.length === 0">
            <p>No se encontraron movimientos.</p>
          </div>
          <div v-else>
            <table>
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Criptomoneda</th>
                  <th>Cantidad</th>
                  <th>Monto</th>
                  <th>Tipo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="movimiento in movimientos" :key="movimiento._id">
                  <td>{{ movimiento.datetime }}</td>
                  <td>{{ movimiento.crypto_code }}</td>
                  <td>{{ movimiento.crypto_amount }}</td>
                  <td>{{ movimiento.money }}</td>
                  <td>{{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
                  <td>
                    <button class="btn btn-info" @click="abrirFormularioEdicion(movimiento)">Editar</button>
                    <button class="btn btn-danger" @click="borrarMovimiento(movimiento._id)">Borrar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="otrousuario">
          <input v-model="nuevaId" type="text" placeholder="Ingrese ID de usuario" @input="verificarId">
          <p v-if="debeMostrarError" class="alerta">ID inválido o sin registros por mostrar.</p>
          <button class="btn btn-outline-dark" @click="verificarMovimientosRegistrados">Buscar</button>
        </div>

        <div v-if="mostrandoEdicionDeFormulario" class="formularioFlotante">
          <h3>Editar Movimiento</h3>
          <div>
            <label>Dinero Gastado: </label>
            <input v-model="nuevoMonto" type="number" step="0.01">
          </div>
          <div>
            <label>Cantidad de Criptomoneda: </label>
            <input v-model="edicionDelMovimiento.crypto_amount" type="number" step="0.0001">
          </div>
          <div class="FormularioEdicion">
            <button class="btn btn-outline-dark" @click="guardarEdicionMovimiento">Guardar</button>
            <button class="btn btn-outline-dark" @click="cancelarEdicionMovimiento">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex';


export default {
  name: 'MovementsView',
   data() {
    return {
      movimientos: [],
      nuevaId: '',
      debeMostrarError: false,
      mostrandoEdicionDeFormulario: false,
      edicionDelMovimiento: {
        money: '',
        crypto_amount: '',
      },
      id: '',
      nuevoMonto: '',
    };
  },


  created() {
    const idDeUsuario = localStorage.getItem('idDeUsuario');
    if (idDeUsuario) {
      this.verificarMovimientosRegistrados(idDeUsuario);
    }
  },


  computed: {
    ...mapState(['usuarios']),
  },


  methods: {

    ApiClient() {
      return axios.create({
        baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
        headers: {
          'x-apikey': '60eb09146661365596af552f',
        },
      });
    },

    verificarMovimientosRegistrados() {
      const idDeUsuario = this.nuevaId || localStorage.getItem('idDeUsuario');
      const url = `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${idDeUsuario}"}`;
      const apiClient = this.ApiClient();

      apiClient
        .get(url)
        .then(response => {
          this.movimientos = response.data;
          if (this.movimientos.length === 0) {
            console.log('No se encontraron movimientos registrados.');
          } else {
            console.log('Se encontraron movimientos registrados.');
          }
        })
        .catch(error => {
          console.error('Error al obtener los movimientos:', error);
        });
    },

    abrirFormularioEdicion(movimiento) {
      console.log("Formulario de edición abierto")
      this.mostrandoEdicionDeFormulario = true;
      this.edicionDelMovimiento = { ...movimiento };
      this.nuevoMonto
    },

    async guardarEdicionMovimiento() {
      if (!this.edicionDelMovimiento || !this.nuevoMonto) return;

      const apiClient = this.ApiClient();
      try {
        console.log(this.edicionDelMovimiento._id);
        const response = await apiClient.patch(`/transactions/${this.edicionDelMovimiento._id}`, {
          money: this.nuevoMonto,
          crypto_amount: this.edicionDelMovimiento.crypto_amount,
        });
        console.log("Movimiento editado y guardado")
        console.log(response);

        this.verificarMovimientosRegistrados();
        this.cancelarEdicionMovimiento();
      } catch (error) {
        console.error("Error al guardar la edición del movimiento: ", error);
      }
    },

    cancelarEdicionMovimiento() {
      this.mostrandoEdicionDeFormulario = false;
      this.edicionDelMovimiento = null;
      this.nuevoMonto = '';
      console.log("Formulario cerrado")
    },

    async borrarMovimiento(id) {
      try {
        const apiClient = this.ApiClient();
        if (!apiClient) return;

        const response = await apiClient.delete(`/transactions/${id}`);
        console.log("Movimiento borrado");
        this.movimientos = this.movimientos.filter(movimiento => movimiento._id !== id); //Actualizamos el HTML removiendo automáticamente los borrados. 
        return response.data;


      } catch (error) {
        console.error("Error al borrar el movimiento", error);
      }
    },

    ocultarEdicionDeFormulario() {
      this.mostrandoEdicionDeFormulario = false; // Ocultamos el formulario de editarMovimiento
    },

  },
};

</script>
<style scoped>
.background {
  background-image: url('https://drive.google.com/file/d/1jE-bFtIf1sqIOCO_Tn1YICllGBa5Z-uP/view?usp=drive_link');
  background-size: cover;
  /* Para que la imagen cubra toda la pantalla */
  background-position: center;
  /* Para centrar la imagen */
  min-height: 100vh;
  /* Para que la imagen ocupe toda la altura de la pantalla */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.container {
  width: 90%;
  /* Ajusta el ancho del contenedor al 90% del viewport width */
  max-width: 1000px;
  text-align: center;
  padding: 0 15px;
  background-color: rgba(255, 255, 255, 0.7);
  /* Fondo semi-transparente */
  color: black;
  /* Color de texto */
  margin-top: 200px;
  /* Ajusta la distancia desde la parte superior */
  animation: moveFromTop 1s ease;
  /* Animación que viene desde arriba */
  box-sizing: border-box;
  /* Incluye el padding en el ancho total */
}

.alerta {
  color: red;
  font-weight: bold;
}

table {
  width: 100%;
  margin-left: 100px;
  border-collapse: collapse;
  overflow-x: auto;
  white-space: nowrap;
  display: block;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  /* Centra el texto en las celdas */
}

th {
  background-color: #f2f2f2;
}

.formularioFlotante {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #00ccff;
  border-radius: 4px;
  color: black;
  margin-top: 5px;
}

.otrousuario input {
  outline: none;
  width: 90%;
  height: 15%;
  margin-bottom: 0px;
  margin-top: 15px;
  border-radius: 15px;
  appearance: none;
  border-style: none;
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  padding: 1%;
  border: 2px solid transparent;
  /* Agrega un borde transparente */
  box-shadow: 0 0 0 2px rgb(255, 123, 0);
  /* Inicialmente, establece un borde negro */
  animation: borderAnimation 2.8s linear infinite;
  /* Agrega la animación al borde */
}

@keyframes borderAnimation {

  0%,
  100% {
    box-shadow: 0 0 0 3px rgb(255, 235, 57);
    /* Borde negro */
  }

  50% {
    box-shadow: 0 0 0 3px transparent, 0 0 0 6px rgb(255, 123, 0);
    /* Borde negro más grande */
  }
}

@keyframes moveFromTop {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .container {
    width: 80%;
    /* Ancho completo en dispositivos pequeños */
    margin-top: 200px;
    /* Menor margen superior */
    margin-bottom: 80px;
  }

  table {
    font-size: 14px;
    /* Tamaño de fuente más pequeño para tablas en dispositivos móviles */
    margin: 0 auto;
    /* Centra la tabla horizontalmente */

  }

  th,
  td {
    padding: 8px;
    /* Reduce el espacio interno en las celdas */
  }
}

.otrousuario button {
  width: 30%;
  height: 60%;
  border-radius: 5%;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  /* Cambia el cursor al pasar sobre el botón */
  transition: transform 0.3s ease;
  color: black;
}

.otrousuario button:active,
.otrousuario button:hover {
  transform: scale(1.1);
}
</style>
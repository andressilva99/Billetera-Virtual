<template>
  <div class="background">
    <div class="container">
      <div class="layout">
        <!-- Comentario: Div para mostrar el formulario de inicio de sesión -->
        <div class="recuadroLogin" v-if="!esIdValida">
          <h1>Ingrese su ID.</h1>
          <h4>Una vez su sesión sea verificada, podrá realizar transacciones.</h4>
          <input v-model="idUsuario" type="text" placeholder="ID de usuario" @input="verificarId" class="idDeUsuario">
          <!-- Comentario: Mostrar mensaje de error si la ID no es válida -->
          <p v-if="debeMostrarError" class="alerta">ID no válido. No se puede iniciar sesión.</p>
        </div>

        <!-- Comentario: Div para mostrar el formulario de transacción -->
        <div v-if="sesionIniciada" class="recuadroBienvenida">
          <h2>Bienvenido, </h2>
          <h5>{{ obtenerUsuario() }}</h5>
          <h3>¿Qué operación desea realizar?</h3>

          <!-- Comentario: Seleccionar el tipo de operación (comprar o vender) -->
          <div class="seccionComprar">
            <label class="texto">Tipo de operación:</label>
            <select v-model="tipoDeOperacion">
              <option value="comprar">Comprar</option>
              <option value="vender">Vender</option>
            </select>
          </div>

          <!-- Comentario: Seleccionar la criptomoneda -->
          <div class="seccionComprar">
            <label class="texto">Criptomoneda:</label>
            <select v-model="criptomonedaSeleccionada">
              <option v-for="criptomoneda in criptomonedas" :key="criptomoneda.id" :value="criptomoneda.id">{{
          criptomoneda.name }}</option>
            </select>
          </div>

          <!-- Comentario: Ingresar la cantidad -->
          <div class="seccionComprar">
            <label class="texto">Cantidad:</label>
            <input v-model="cantidad" type="number" step="0.1" min="0.000001" @change="calcularMonto">
          </div>

          <!-- Comentario: Mostrar el monto a pagar -->
          <div class="seccionComprar">
            <label class="texto">Monto a pagar:</label>
            <input type="number" readonly :value="montoActualizado">
          </div>

          <!-- Comentario: Botón para guardar la transacción -->
          <div class="centrarBoton">
            <button class="btn btn-outline-dark" @click="guardarTransaccion"
              :disabled="!datosValidos || (tipoDeOperacion === 'vender' && !puedeVender) || bloquearBoton">Guardar
              Transacción</button>
          </div>
        </div>

        <!-- Comentario: Div para mostrar los datos de las compras o ventas -->
        <div class="mostrarCompra">
          <div v-if="compraRealizada" class="recuadroCompraRealizada">
            <h3>Compra Realizada</h3>
            <p>Fecha y Hora: {{ compraActual.fechaHora }}</p>
            <p>Criptomoneda: {{ compraActual.criptomoneda }}</p>
            <p>Cantidad: {{ compraActual.cantidad }}</p>
            <p>Monto: ${{ compraActual.monto }}</p>
          </div>
          <div v-if="ventaRealizada" class="recuadroCompraRealizada">
            <h3>Venta Realizada</h3>
            <p>Fecha y Hora: {{ ventaActual.fechaHora }}</p>
            <p>Criptomoneda: {{ ventaActual.criptomoneda }}</p>
            <p>Cantidad: {{ ventaActual.cantidad }}</p>
            <p>Monto: ${{ ventaActual.monto }}</p>
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
  data() {
    return {
      idUsuario: '',
      debeMostrarError: false,
      criptomonedaSeleccionada: '',
      cantidad: 0,
      fechaHora: '',
      monto: 0,
      precios: {},
      compraRealizada: false,
      ventaRealizada: false,
      tipoDeOperacion: 'comprar',
      compraActual: {
        fechaHora: '',
        criptomoneda: '',
        cantidad: '',
        monto: '',
        tipoDeOperacion: 'comprar',
      },
      ventaActual: {
        fechaHora: '',
        criptomoneda: '',
        cantidad: '',
        monto: '',
        tipoDeOperacion: 'vender',
      },
      puedeVender: false,
      bloquearBoton: false,
      contadorCriptomonedas: {},
    };
  },

  methods: {
    mounted() {
      // Cargar el contador desde localStorage
      if (localStorage.getItem('contadorCriptomonedas')) {
        this.contadorCriptomonedas = JSON.parse(localStorage.getItem('contadorCriptomonedas'));
      }
    },

    ApiClient() {
      return axios.create({
        baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
        headers: {
          'x-apikey': '60eb09146661365596af552f',
        },
      });
    },

    obtenerUsuario() {
      const usuario = this.usuarios.find((usuario) => usuario.idUsuario === this.idUsuario);
      return usuario ? `${usuario.Email}` : '';
    },

    calcularMonto() {
      const criptomoneda = this.criptomonedas.find((c) => c.id === this.criptomonedaSeleccionada);
      if (criptomoneda) {
        const url = `https://criptoya.com/api/argenbtc/${criptomoneda.id}/ars/${this.cantidad}`;
        const action = this.tipoDeOperacion === 'comprar' ? 'ask' : 'bid';

        axios
          .get(url)
          .then((response) => {
            const precioARS = response.data[action];
            this.precios[criptomoneda.id] = precioARS;
            this.monto = (this.cantidad * precioARS).toFixed(2);
          })
          .catch((error) => {
            console.error('Error al obtener el monto en pesos (ARG): ', error);
          });
      }
    },

    verificarId() {
      const idValida = this.usuarios.some((usuario) => usuario.idUsuario === this.idUsuario);
      const tieneDiezDigitos = this.idUsuario.length === 10;
      this.debeMostrarError = !idValida && tieneDiezDigitos;
      if (this.sesionIniciada) {
        this.verificarCantidadCriptomonedas();
      }
    },

    guardarTransaccion() {
      const nuevaTransaccion = {
        user_id: this.idUsuario,
        action: this.tipoDeOperacion === 'comprar' ? 'purchase' : 'sale',
        crypto_code: this.criptomonedaSeleccionada,
        crypto_amount: this.cantidad.toString(),
        money: this.monto.toString(),
        datetime: this.fechaHoraActual(),
      };

      axios
        .post('https://laboratorio3-f36a.restdb.io/rest/transactions',nuevaTransaccion, {
          headers: {
            'x-apikey': '60eb09146661365596af552f',
          },
        })
        .then((response) => {
          console.log('Operación exitosa:', response.data);

          if (nuevaTransaccion.action === 'purchase') {
            // Operación de compra
            this.compraActual.fechaHora = this.fechaHoraActual();
            this.compraActual.criptomoneda = this.obtenerNombreCriptomoneda();
            this.compraActual.cantidad = this.cantidad;
            this.compraActual.monto = this.monto;
            this.compraRealizada = true;
            if (!this.contadorCriptomonedas[this.criptomonedaSeleccionada]) {
              this.contadorCriptomonedas[this.criptomonedaSeleccionada] = 0;
            }
            this.contadorCriptomonedas[this.criptomonedaSeleccionada] += this.cantidad;
          } else if (nuevaTransaccion.action === 'sale') {
            // Operación de venta
            this.ventaActual.fechaHora = this.fechaHoraActual();
            this.ventaActual.criptomoneda = this.obtenerNombreCriptomoneda();
            this.ventaActual.cantidad = this.cantidad;
            this.ventaActual.monto = this.monto;
            this.ventaRealizada = true;

            //Restar la cantidad vendida de la cantidad comprada para reflejar la venta
            this.contadorCriptomonedas[this.criptomonedaSeleccionada] -= this.cantidad;
          }
          this.bloquearBoton = true;
          this.verificarCantidadCriptomonedas();
          this.resetearFormulario();
        })
        .catch((error) => {
          console.error('Error al guardar la transacción:', error);
        });
    },


    resetearFormulario() {
      this.criptomonedaSeleccionada = '';
      this.cantidad = 0;
      this.fechaHora = this.fechaHoraActual();
      this.monto = 0;
    },

    obtenerNombreCriptomoneda() {
      const criptomoneda = this.criptomonedas.find((c) => c.id === this.criptomonedaSeleccionada);
      return criptomoneda ? criptomoneda.name : '';
    },

    fechaHoraActual() {
      const now = new Date();
      const year = now.getFullYear();
      const month = `${now.getMonth() + 1}`.padStart(2, '0');
      const day = `${now.getDate()}`.padStart(2, '0');
      const hour = `${now.getHours()}`.padStart(2, '0');
      const minute = `${now.getMinutes()}`.padStart(2, '0');
      return `${year}-${month}-${day}  ${hour}:${minute}`;
    },

    verificarCantidadCriptomonedas() {
      const idDeUsuario = this.idDeUsuario;
      const codigoCriptomoneda = this.criptomonedaSeleccionada;

      const url = `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${idDeUsuario}","crypto_code":"${codigoCriptomoneda}"}`;
      const apiClient = this.ApiClient();

      apiClient
        .get(url)
        .then((response) => {
          const movimientosCriptomoneda = response.data;
          let cantidadComprada = 0;
          let cantidadVendida = 0;
          let cantidadDisponible = 0;

          for (const movimiento of movimientosCriptomoneda) {
            if (movimiento.action === 'purchase') {
              cantidadComprada += parseFloat(movimiento.crypto_amount);
            } else if (movimiento.action === 'sale') {
              cantidadVendida += parseFloat(movimiento.crypto_amount);
            }
          }

          const contadorCriptomonedas = this.contadorCriptomonedas[this.criptomonedaSeleccionada] || 0;
          cantidadComprada += contadorCriptomonedas;
          cantidadDisponible = cantidadComprada - cantidadVendida;

          this.puedeVender = cantidadDisponible >= 0 && this.cantidad > 0 && this.cantidad <= cantidadDisponible;
          if (this.tipoDeOperacion === 'comprar') {
            // Para comprar, no hay restricciones, siempre se puede comprar.
            this.puedeVender = true;
          } else if (this.tipoDeOperacion === 'vender' && this.cantidad > this.contadorCriptomonedas[this.criptomonedaSeleccionada]) {
            this.puedeVender = this.cantidad <= cantidadDisponible;
            this.puedeVender ? null : console.log("No puede realizar la venta. No tiene las criptomonedas")
          }

          localStorage.setItem('contadorCriptomonedas', JSON.stringify(this.contadorCriptomonedas));
          this.bloquearBoton = false; // Desbloquear el botón después de la validación
        })
        .catch((error) => {
          console.error('Error al obtener la cantidad de criptomonedas:', error);
        });
    },
  },


  computed: {
    ...mapState(['usuarios']),
    sesionIniciada() {
      return this.idUsuario !== '' && this.esIdValida;
    },

    esIdValida() {
      return this.usuarios.some((usuario) => usuario.idUsuario === this.idUsuario);
    },

    criptomonedas() {
      return [
        { id: 'btc', name: 'Bitcoin' },
        { id: 'eth', name: 'Ethereum' },
        { id: 'usdt', name: 'USDT' },
        { id: 'dai', name: 'DAI' },
      ];
    },

    datosValidos() {
      return (
        this.criptomonedaSeleccionada !== '' &&
        this.cantidad > 0 &&
        this.monto >= 0
      );
    },

    montoActualizado() {
      const criptomoneda = this.criptomonedas.find((c) => c.id === this.criptomonedaSeleccionada);
      if (criptomoneda) {
        const precioARS = this.precios[criptomoneda.id];
        return (this.cantidad * precioARS).toFixed(2);
      } else {
        return 0;
      }
    },
  },

  watch: {
    cantidad: {
      handler() {
        this.calcularMonto();
        this.verificarCantidadCriptomonedas();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.background {
  background-image: url('https://www.xtrafondos.com/wallpapers/bitcoin-criptomonedas-6876.jpg');
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
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  /* Fondo semi-transparente */
  color: black;
  /* Color de texto */
  margin-top: 200px;
  /* Ajusta la distancia desde la parte superior */
  animation: moveFromTop 1s ease;
  /* Animación que viene desde arriba */
}

.seccionComprar {
  margin-top: 7px;
}

.centrarBoton {
  margin-top: 15px;
  margin-bottom: 15px;
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

  /* Estilos para dispositivos con un ancho máximo de 768px */
  .container {
    width: 90%;
    margin-top: 200px;
    /* Ajusta el margen superior para dispositivos móviles */
    margin-bottom: 80px;
  }
  .recuadroBienvenida {
    padding: 10px; /* Reducir el padding para pantallas más pequeñas */
    font-size: 14px; /* Reducir el tamaño del texto para mejor legibilidad */
  }
}
.recuadroBienvenida {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

</style>
<template>
  <div class="background">
    <div class="container">
      <div class="layout">
        <h1>Estado de Inversiones</h1>
        <div v-if="resumenCriptomonedas.length === 0">
          <p>No tienes criptomonedas.</p>
        </div>

        <div v-else>
          <table>
            <thead>
              <tr>
                <th>Criptomoneda</th>
                <th>Compra</th>
                <th>Cantidad comprada</th>
                <th>Venta</th>
                <th>Cantidad vendida</th>
                <th>Resultado</th>
                <th>Criptomonedas Disponibles</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="resumen in resumenCriptomonedas" :key="resumen.idCriptomoneda">
                <td>{{ obtenerNombre(resumen.idCriptomoneda) }}</td>
                <td>{{ formatearNumero(resumen.comprado) }}</td>
                <td>{{ resumen.cantidadComprada }}</td>
                <td>{{ formatearNumero(resumen.vendido) }}</td>
                <td>{{ resumen.cantidadVendida }}</td>
                <td>{{ formatearNumero(resumen.resultado) }}</td>
                <td>{{ resumen.cantidadDisponible }}</td>
              </tr>
            </tbody>
          </table>
          <h3>Estado Final de inversiones</h3>
          <p>{{ formatearNumero(resumenTotal) }}</p>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      resumenCriptomonedas: [],
      resumenTotal: 0,
      criptomonedas: {},
    };
  },

  created() {
    this.obtenerEstadoActual();
  },

  methods: {
    listaCriptomonedas() {
      return [
        { id: 'btc', name: 'Bitcoin' },
        { id: 'eth', name: 'Ethereum' },
        { id: 'usdt', name: 'USDT' },
        { id: 'dai', name: 'DAI' },
      ];
    },

    formatearNumero(num) {
      return Number(num).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    },

    obtenerNombre(id) {
      const crypto = this.listaCriptomonedas().find(c => c.id === id);
      return crypto ? crypto.name : id;
    },

    obtenerEstadoActual() {
      const idUsuario = localStorage.getItem('idUsuario');
      const url = `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${idUsuario}"}`;

      axios.get(url, {
        headers: {
          'x-apikey': '60eb09146661365596af552f',
        },
      }).then((response) => {
        const transacciones = response.data;
        this.criptomonedas = {};

        for (const transaccion of transacciones) {
          const idCriptomoneda = transaccion.crypto_code;

          if (!this.criptomonedas[idCriptomoneda]) {
            this.criptomonedas[idCriptomoneda] = {
              idCriptomoneda: idCriptomoneda,
              comprado: 0,
              vendido: 0,
              cantidadComprada: 0,
              cantidadVendida: 0,

            };
          }

          if (transaccion.action === "purchase") {
            this.criptomonedas[idCriptomoneda].comprado += parseFloat(transaccion.money);
            this.criptomonedas[idCriptomoneda].cantidadComprada += transaccion.action === "purchase" ? parseFloat(transaccion.crypto_amount) : 0;
            this.criptomonedas[idCriptomoneda].cantidadDisponible = this.criptomonedas[idCriptomoneda].cantidadComprada - this.criptomonedas[idCriptomoneda].cantidadVendida;
          } else if (transaccion.action === "sale") {
            this.criptomonedas[idCriptomoneda].vendido += parseFloat(transaccion.money);
            this.criptomonedas[idCriptomoneda].cantidadVendida += transaccion.action === "sale" ? parseFloat(transaccion.crypto_amount) : 0;
            this.criptomonedas[idCriptomoneda].cantidadDisponible = this.criptomonedas[idCriptomoneda].cantidadComprada - this.criptomonedas[idCriptomoneda].cantidadVendida;
          }
        }

        this.resumenCriptomonedas = Object.values(this.criptomonedas).map(crip => {
          crip.resultado = crip.vendido - crip.comprado;
          this.resumenTotal += crip.resultado;
          return crip;
        });
      });
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

  .layout {
    padding: 10px;
  }
}

table {
  width: 100%;

  overflow-x: auto;
  white-space: nowrap;
  display: block;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>
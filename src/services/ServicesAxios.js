//En esta linea se importa axios para realzar solicitudes HTTP a una API.
import axios from "axios";

//Creación de la instancias de Axios con una URL basse configurada y un encabezado personal "x-apikey".
const clientAPI = axios.create({
  baseURL: "https://laboratorio3-f36a.restdb.io/rest/",
  headers: { "x-apikey": "60eb09146661365596af552f" },
});

//Definición de metodos de solicitud HTTP.
export default {
  // Crea una nueva transacción
  async newTransaction(newTransaction) {
    try {
      const response = await clientAPI.post(`/transactions`, newTransaction);
      return response.data;
    } catch (error) {
      console.error("Error al crear una nueva transacción:", error);
      throw error;
    }
  },

  // Obtiene movimientos filtrados por nombre de usuario
  async getMovements(username) {
    try {
      const response = await clientAPI.get(
        `/transactions?q={"user_id": "${username}"}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener movimientos:", error);
      throw error;
    }
  },

  // Obtiene un movimiento por su ID
  async getMovementById(id) {
    try {
      const response = await clientAPI.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener un movimiento por ID:", error);
      throw error;
    }
  },

  // Actualiza un movimiento
  async updateMovement(id, transactionEdited) {
    try {
      transactionEdited.datetime = Date.now();
      const response = await clientAPI.put(
        `/transactions/${id}`,
        transactionEdited
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar un movimiento:", error);
      throw error;
    }
  },

  // Elimina un movimiento
  async deleteMovement(id) {
    try {
      const response = await clientAPI.delete(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar un movimiento:", error);
      throw error;
    }
  },

  // Obtiene datos de criptomonedas
  async getCryptoData(coin) {
    try {
      const response = await axios.get(
        `https://criptoya.com/api/binance/"+ coin +"/ars/0.1`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos de criptomonedas:", error);
      throw error;
    }
  },

  // Lista de criptomonedas habilitadas
  cryptos: [
    {
      id: 0,
      name: "Bitcoin",
      symbol: "BTC",
      amount: 0,
      sales: 0,
      purchases: 0,
      amountInMoney: 0,
      result: 0,
    },
    {
      id: 1,
      name: "Dogecoin",
      symbol: "DOGE",
      amount: 0,
      sales: 0,
      purchases: 0,
      amountInMoney: 0,
      result: 0,
    },
    {
      id: 2,
      name: "Polkadot",
      symbol: "DOT",
      amount: 0,
      sales: 0,
      purchases: 0,
      amountInMoney: 0,
      result: 0,
    },
    {
      id: 3,
      name: "Pax Dollar",
      symbol: "USDP",
      amount: 0,
      sales: 0,
      purchases: 0,
      amountInMoney: 0,
      result: 0,
    },
    {
      id: 4,
      name: "Avalanche",
      symbol: "AVAX",
      amount: 0,
      sales: 0,
      purchases: 0,
      amountInMoney: 0,
      result: 0,
    },
  ],
};

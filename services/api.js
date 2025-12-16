import axios from 'axios';
import { Platform } from 'react-native';

// Käytä tietokoneen IP-osoitetta puhelimessa
// Löydät IP-osoitteen: Windows: ipconfig, Mac/Linux: ifconfig
// Jos käytät emulaattoria, käytä 'http://10.0.2.2:3000' (Android) tai 'http://localhost:3000' (iOS)
const API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:3000'
  : Platform.OS === 'android'
  ? 'http://192.168.1.240:3000' // Fyysinen Android-puhelin - käytä tietokoneen IP-osoitetta
  : 'http://192.168.1.240:3000'; // iOS tai fyysinen laite - käytä WiFi-verkon IP-osoitetta (EI VirtualBox)

// Luo axios-instanssi
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - lisää auth token
api.interceptors.request.use(
  async (config) => {
    // Tässä voisi lisätä tokenin, jos käytössä
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - käsittele virheet
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      console.error('API Error: Ei yhteyttä palvelimeen. Varmista että mock-palvelin on käynnissä (npm run mock-server)');
      return Promise.reject(new Error('Ei yhteyttä palvelimeen. Varmista että mock-palvelin on käynnissä.'));
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Todo API
export const todoAPI = {
  // GET /todos - Hae kaikki todot
  async getAllTodos() {
    try {
      const response = await api.get('/todos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET /todos/:id - Hae yksi todo
  async getTodoById(id) {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST /todos - Luo uusi todo
  async createTodo(todo) {
    try {
      const response = await api.post('/todos', todo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT /todos/:id - Päivitä todo
  async updateTodo(id, todo) {
    try {
      const response = await api.put(`/todos/${id}`, todo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE /todos/:id - Poista todo
  async deleteTodo(id) {
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Auth API
export const authAPI = {
  // POST /auth/login - Kirjaudu sisään
  async login(username, password) {
    try {
      // Koska käytämme mock-palvelinta, teemme yksinkertaisen tarkistuksen
      const response = await api.get('/users');
      const users = response.data;
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      
      if (user) {
        // Palautetaan token-muodossa (yksinkertainen)
        return {
          token: `token_${user.id}_${Date.now()}`,
          user: { id: user.id, username: user.username, name: user.name },
        };
      } else {
        throw new Error('Väärä käyttäjänimi tai salasana');
      }
    } catch (error) {
      throw error;
    }
  },
};

export default api;


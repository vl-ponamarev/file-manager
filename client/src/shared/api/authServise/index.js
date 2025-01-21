import api from '../../http/index';

export default class AuthService {
  static async login(email, password) {
    try {
      const response = await api.post('/login', email, password);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async registration(email, password) {
    try {
      const response = await api.post('/registration', email, password);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async logout() {
    try {
      const response = await api.post('/logout');
      console.error(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

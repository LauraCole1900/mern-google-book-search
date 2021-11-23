import decode from 'jwt-decode';

class AuthService {
  // GET user data
  getProfile() {
    return decode(this.getToken());
  }

  // Check if user is logged in
  loggedIn() {
    // Check if there's a saved token and that it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    // window.location.assign('/');
  }

  logout() {
    // Clears user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // Reloads the page and resets the state of the application
    // window.location.assign('/');
  }
}

export default new AuthService();
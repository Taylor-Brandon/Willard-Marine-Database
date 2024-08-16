import decode from 'jwt-decode';

class AuthService {
  getUser() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken, redirectUrl = '/home') {
    localStorage.setItem('id_token', idToken);
    window.location.assign(redirectUrl);
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login'); 
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true; 
    }
    return false;
  }
}

export default new AuthService();

class SessionStore {
  accessToken: string | null = null;

  setToken(token: string) {
    this.accessToken = token;
  }

  getToken() {
    return this.accessToken;
  }

  clear() {
    this.accessToken = null;
  }
}

export const session = new SessionStore();

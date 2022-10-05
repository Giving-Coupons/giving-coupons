import AdminAPI from './admin';

const api = Object.freeze({
  admin: new AdminAPI(),
});

export default api;

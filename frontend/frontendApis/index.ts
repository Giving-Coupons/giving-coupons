import AdminAPI from './admin';
import InterestAPI from './interest';

const api = Object.freeze({
  admin: new AdminAPI(),
  interest: new InterestAPI(),
});

export default api;

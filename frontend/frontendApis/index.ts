import AdminsAPI from './admins';
import InterestsAPI from './interests';

const api = Object.freeze({
  admins: new AdminsAPI(),
  interests: new InterestsAPI(),
});

export default api;

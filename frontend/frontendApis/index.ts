import AdminsAPI from './admins';
import InterestsAPI from './interests';
import PrimaryDonorsAPI from './primaryDonors';

const api = Object.freeze({
  admins: new AdminsAPI(),
  interests: new InterestsAPI(),
  primaryDonors: new PrimaryDonorsAPI(),
});

export default api;

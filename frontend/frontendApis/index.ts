import AdminsAPI from './admins';
import InterestsAPI from './interests';
import PrimaryDonorsAPI from './primaryDonors';
import CharitiesAPI from './charities';

const api = Object.freeze({
  admins: new AdminsAPI(),
  charities: new CharitiesAPI(),
  interests: new InterestsAPI(),
  primaryDonors: new PrimaryDonorsAPI(),
});

export default api;

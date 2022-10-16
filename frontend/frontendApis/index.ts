import AdminsAPI from './admins';
import CampaignsAPI from './campaigns';
import CharitiesAPI from './charities';
import InterestsAPI from './interests';
import PrimaryDonorsAPI from './primaryDonors';
import CouponsAPI from './coupons';

const api = Object.freeze({
  admins: new AdminsAPI(),
  campaigns: new CampaignsAPI(),
  charities: new CharitiesAPI(),
  coupons: new CouponsAPI(),
  interests: new InterestsAPI(),
  primaryDonors: new PrimaryDonorsAPI(),
});

export default api;

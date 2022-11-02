import AdminsAPI from './admins';
import CampaignsAPI from './campaigns';
import CharitiesAPI from './charities';
import CouponsAPI from './coupons';
import InterestsAPI from './interests';
import PrimaryDonorsAPI from './primaryDonors';
import RedemptionsAPI from './redemptions';
import SecondaryDonationsAPI from './secondaryDonations';

const api = Object.freeze({
  admins: new AdminsAPI(),
  campaigns: new CampaignsAPI(),
  charities: new CharitiesAPI(),
  coupons: new CouponsAPI(),
  interests: new InterestsAPI(),
  primaryDonors: new PrimaryDonorsAPI(),
  redemptions: new RedemptionsAPI(),
  secondaryDonations: new SecondaryDonationsAPI(),
});

export default api;

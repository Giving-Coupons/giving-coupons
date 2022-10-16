import { ApiPromise } from '../types/api';
import { SecondaryDonationData, SecondaryDonationPostData } from '../types/donations';
import BaseAPI from './base';

class SecondaryDonationsAPI extends BaseAPI {
  static SECONDARY_DONATIONS_URL = 'secondary_donations';

  public addSecondaryDonation(data: SecondaryDonationPostData): ApiPromise<SecondaryDonationData> {
    return this.post(SecondaryDonationsAPI.SECONDARY_DONATIONS_URL, data);
  }
}

export default SecondaryDonationsAPI;

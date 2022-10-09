import { PrimaryDonor } from '../types/primaryDonor';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';
import { WithoutId } from '../types/utils';

class PrimaryDonorsAPI extends BaseAPI {
  protected static PRIMARY_DONORS_URL = 'primary_donors';

  public list(): ApiPromise<PrimaryDonor[]> {
    return this.get(PrimaryDonorsAPI.PRIMARY_DONORS_URL);
  }

  public addDonor(primaryDonor: WithoutId<PrimaryDonor>): ApiPromise<PrimaryDonor> {
    return this.post(PrimaryDonorsAPI.PRIMARY_DONORS_URL, primaryDonor);
  }

  public putDonor(primaryDonor: PrimaryDonor): ApiPromise<PrimaryDonor> {
    const { id: donorId, ...data } = primaryDonor;
    return this.put(`${PrimaryDonorsAPI.PRIMARY_DONORS_URL}/${donorId}`, data);
  }

  public deleteDonor(donorId: number): ApiPromise<null> {
    return this.delete(`${PrimaryDonorsAPI.PRIMARY_DONORS_URL}/${donorId}`);
  }
}

export default PrimaryDonorsAPI;

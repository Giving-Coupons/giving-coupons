import { ApiPromise } from '../types/api';
import { PrimaryDonor, PrimaryDonorPostData, PrimaryDonorPutData } from '../types/primaryDonor';
import BaseAPI from './base';

class PrimaryDonorsAPI extends BaseAPI {
  protected static PRIMARY_DONORS_URL = 'primary_donors';

  public list(): ApiPromise<PrimaryDonor[]> {
    return this.get(PrimaryDonorsAPI.PRIMARY_DONORS_URL);
  }

  public addDonor(primaryDonorPostData: PrimaryDonorPostData): ApiPromise<PrimaryDonor> {
    return this.post(PrimaryDonorsAPI.PRIMARY_DONORS_URL, primaryDonorPostData);
  }

  public putDonor(donorId: number, primaryDonorPutdata: PrimaryDonorPutData): ApiPromise<PrimaryDonor> {
    return this.put(`${PrimaryDonorsAPI.PRIMARY_DONORS_URL}/${donorId}`, primaryDonorPutdata);
  }

  public deleteDonor(donorId: number): ApiPromise<null> {
    return this.delete(`${PrimaryDonorsAPI.PRIMARY_DONORS_URL}/${donorId}`);
  }
}

export default PrimaryDonorsAPI;

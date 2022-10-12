import { ApiPromise } from '../types/api';
import { PrimaryDonorData, PrimaryDonorPostData, PrimaryDonorPutData } from '../types/primaryDonor';
import BaseAPI from './base';

class PrimaryDonorsAPI extends BaseAPI {
  protected static PRIMARY_DONORS_URL = 'primary_donors';

  public list(): ApiPromise<PrimaryDonorData[]> {
    return this.get(PrimaryDonorsAPI.PRIMARY_DONORS_URL);
  }

  public addDonor(primaryDonorPostData: PrimaryDonorPostData): ApiPromise<PrimaryDonorData> {
    return this.post(PrimaryDonorsAPI.PRIMARY_DONORS_URL, primaryDonorPostData);
  }

  public putDonor(donorId: number, primaryDonorPutdata: PrimaryDonorPutData): ApiPromise<PrimaryDonorData> {
    return this.put(`${PrimaryDonorsAPI.PRIMARY_DONORS_URL}/${donorId}`, primaryDonorPutdata);
  }

  public deleteDonor(donorId: number): ApiPromise<null> {
    return this.delete(`${PrimaryDonorsAPI.PRIMARY_DONORS_URL}/${donorId}`);
  }
}

export default PrimaryDonorsAPI;

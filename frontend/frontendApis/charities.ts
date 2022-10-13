import { CharityData, CharityListData, CharityPostData, CharityPutData } from '../types/charity';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

class CharitiesAPI extends BaseAPI {
  protected static CHARITIES_URL = 'charities';

  public list(): ApiPromise<CharityListData[]> {
    return this.get(`${CharitiesAPI.CHARITIES_URL}`);
  }

  public addCharity(charityPostData: CharityPostData): ApiPromise<CharityData> {
    return this.post(CharitiesAPI.CHARITIES_URL, charityPostData);
  }

  public getCharity(id: number): ApiPromise<CharityData> {
    return this.get(`${CharitiesAPI.CHARITIES_URL}/${id}`);
  }

  public putCharity(id: number, charityPutData: CharityPutData): ApiPromise<CharityData> {
    return this.put(`${CharitiesAPI.CHARITIES_URL}/${id}`, charityPutData);
  }

  public deleteCharity(id: number): ApiPromise<void> {
    return this.delete(`${CharitiesAPI.CHARITIES_URL}/${id}`);
  }
}

export default CharitiesAPI;

import { ApiPromise } from '../types/api';
import { InterestData, InterestPostData, InterestPutData } from '../types/interest';
import BaseAPI from './base';

class InterestsAPI extends BaseAPI {
  static INTERESTS_URL = 'interests';

  public list(): ApiPromise<InterestData[]> {
    return this.get(InterestsAPI.INTERESTS_URL);
  }

  public getInterest(interestId: number): ApiPromise<InterestData> {
    return this.get(`${InterestsAPI.INTERESTS_URL}/${interestId}`);
  }

  public addInterest(data: InterestPostData): ApiPromise<InterestData> {
    return this.post(InterestsAPI.INTERESTS_URL, data);
  }

  public putInterest(interestId: number, data: InterestPutData): ApiPromise<InterestData> {
    return this.put(`${InterestsAPI.INTERESTS_URL}/${interestId}`, data);
  }

  public deleteInterest(interestId: number): ApiPromise<InterestData> {
    return this.delete(`${InterestsAPI.INTERESTS_URL}/${interestId}`);
  }

  public approveInterest(interestId: number): ApiPromise<InterestData> {
    return this.post(`${InterestsAPI.INTERESTS_URL}/${interestId}/approve`);
  }

  public rejectInterest(interestId: number): ApiPromise<InterestData> {
    return this.post(`${InterestsAPI.INTERESTS_URL}/${interestId}/reject`);
  }
}

export default InterestsAPI;

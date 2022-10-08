import { ApiPromise } from '../types/api';
import { Interest, InterestWithoutId, InterestData, InterestPostData, InterestPatchData } from '../types/interest';
import BaseAPI from './base';
import { mapOnApiResponse } from './helpers/typeConverter';

class InterestsAPI extends BaseAPI {
  protected static INTERESTS_URL = 'interests';

  public list(): ApiPromise<Interest[]> {
    return this.get(InterestsAPI.INTERESTS_URL);
  }

  public addInterest(data: InterestWithoutId): ApiPromise<Interest> {
    const promise: ApiPromise<InterestData> = this.post(
      `${InterestsAPI.INTERESTS_URL}`,
      convertInterestToDataWithoutId(data) as InterestPostData,
    );
    return promise.then(mapOnApiResponse(convertDataToInterest));
  }

  public putInterest(interestId: number, data: InterestWithoutId): ApiPromise<Interest> {
    const promise: ApiPromise<InterestData> = this.put(
      `${InterestsAPI.INTERESTS_URL}/${interestId}`,
      convertInterestToDataWithoutId(data) as InterestPatchData,
    );
    return promise.then(mapOnApiResponse(convertDataToInterest));
  }

  public deleteInterest(interestId: number): ApiPromise<null> {
    return this.delete(`${InterestsAPI.INTERESTS_URL}/${interestId}`);
  }
}

function convertInterestToDataWithoutId({
  donorName,
  donorEmail,
  campaignName,
  campaignDescription,
  promisedAmount,
  start,
  end,
  status,
  charities,
  couponDenomination,
}: InterestWithoutId) {
  return {
    donorName,
    donorEmail,
    campaignName,
    campaignDescription,
    promisedAmount,
    start: start.toISOString(),
    end: end.toISOString(),
    status,
    charityIds: charities.map((c) => c.id),
    couponDenomination,
  };
}

function convertDataToInterest(data: InterestData): Interest {
  return { ...data, start: new Date(data.start), end: new Date(data.end) };
}

export default InterestsAPI;

import { ApiPromise } from '../types/api';
import { Interest, InterestWithoutId, InterestData, InterestPostData, InterestPatchData } from '../types/interest';
import BaseAPI from './base';
import { mapOnApiResponse } from './helpers/typeConverter';

class InterestAPI extends BaseAPI {
  protected static INTEREST_URL = 'interests';

  public list(): ApiPromise<Interest[]> {
    return this.get(InterestAPI.INTEREST_URL);
  }

  public addInterest(data: InterestWithoutId): ApiPromise<Interest> {
    const promise: ApiPromise<InterestData> = this.post(
      `${InterestAPI.INTEREST_URL}`,
      convertInterestToDataWithoutId(data) as InterestPostData,
    );
    return promise.then(mapOnApiResponse(convertDataToInterest));
  }

  public putInterest(interestId: number, data: InterestWithoutId): ApiPromise<Interest> {
    const promise: ApiPromise<InterestData> = this.put(
      `${InterestAPI.INTEREST_URL}/${interestId}`,
      convertInterestToDataWithoutId(data) as InterestPatchData,
    );
    return promise.then(mapOnApiResponse(convertDataToInterest));
  }

  public deleteInterest(interestId: number): ApiPromise<null> {
    return this.delete(`${InterestAPI.INTEREST_URL}/${interestId}`);
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

export default InterestAPI;

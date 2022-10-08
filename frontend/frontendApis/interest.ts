import { ApiPromise } from '../types/api';
import { Interest, InterestWithoutId, InterestDataInput, InterestDataOutput } from '../types/interest';
import BaseAPI from './base';
import { mapOnApiResponse } from './helpers/typeConverter';

class InterestAPI extends BaseAPI {
  protected static INTEREST_URL = 'interests';

  public list(): ApiPromise<Interest[]> {
    return this.get(InterestAPI.INTEREST_URL);
  }

  public addInterest(data: InterestWithoutId): ApiPromise<Interest> {
    const promise: ApiPromise<InterestDataOutput> = this.post(
      `${InterestAPI.INTEREST_URL}`,
      convertInterestToDataWithoutId(data),
    );
    return promise.then(mapOnApiResponse(convertDataToInterest));
  }

  public putInterest(interestId: number, data: InterestWithoutId): ApiPromise<Interest> {
    const promise: ApiPromise<InterestDataOutput> = this.put(
      `${InterestAPI.INTEREST_URL}/${interestId}`,
      convertInterestToDataWithoutId(data),
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
}: InterestWithoutId): InterestDataInput {
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

function convertDataToInterest(data: InterestDataOutput): Interest {
  return { ...data, start: new Date(data.start), end: new Date(data.end) };
}

export default InterestAPI;

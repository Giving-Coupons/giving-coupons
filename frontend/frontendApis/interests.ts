import { ApiPromise } from '../types/api';
import { Interest, InterestData, InterestPostData, InterestPutData } from '../types/interest';
import { WithoutId } from '../types/utils';
import BaseAPI from './base';
import { mapOnApiResponse } from './helpers/typeConverter';

class InterestsAPI extends BaseAPI {
  protected static INTERESTS_URL = 'interests';

  public list(): ApiPromise<Interest[]> {
    const promise: ApiPromise<InterestData[]> = this.get(InterestsAPI.INTERESTS_URL);
    return promise.then(mapOnApiResponse((arr) => arr.map(convertDataToInterest)));
  }

  public addInterest(data: WithoutId<Interest>): ApiPromise<Interest> {
    const promise: ApiPromise<InterestData> = this.post(
      `${InterestsAPI.INTERESTS_URL}`,
      convertInterestToDataWithoutId(data) as InterestPostData,
    );
    return promise.then(mapOnApiResponse(convertDataToInterest));
  }

  public putInterest(interestId: number, data: WithoutId<Interest>): ApiPromise<Interest> {
    const promise: ApiPromise<InterestData> = this.put(
      `${InterestsAPI.INTERESTS_URL}/${interestId}`,
      convertInterestToDataWithoutId(data) as InterestPutData,
    );
    return promise.then(mapOnApiResponse(convertDataToInterest));
  }

  public deleteInterest(interestId: number): ApiPromise<null> {
    return this.delete(`${InterestsAPI.INTERESTS_URL}/${interestId}`);
  }
}

function convertInterestToDataWithoutId({ charities, ...interestData }: WithoutId<Interest>) {
  return {
    ...interestData,
    start: interestData.start.toISOString(),
    end: interestData.end.toISOString(),
    charityIds: charities.map((c) => c.id),
  };
}

function convertDataToInterest(data: InterestData): Interest {
  return { ...data, start: new Date(data.start), end: new Date(data.end) };
}

export default InterestsAPI;
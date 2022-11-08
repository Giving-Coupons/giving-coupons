import { ApiPromise } from '../types/api';
import { LandingPageStatsData, StepsStatsData } from '../types/summary';
import BaseAPI from './base';

class StatsAPI extends BaseAPI {
  static STATS_URL = 'stats';

  public getLandingPageStats(): ApiPromise<LandingPageStatsData> {
    return this.get(StatsAPI.STATS_URL);
  }

  public getStepsStats(): ApiPromise<StepsStatsData> {
    return this.get(`${StatsAPI.STATS_URL}/steps`);
  }
}

export default StatsAPI;

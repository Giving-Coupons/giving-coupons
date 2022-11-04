import { ApiPromise } from '../types/api';
import { SummaryData } from '../types/summary';
import BaseAPI from './base';

class StatsAPI extends BaseAPI {
  static STATS_URL = 'stats';

  public getSummaryStats(): ApiPromise<SummaryData> {
    return this.get(`${StatsAPI.STATS_URL}`);
  }
}

export default StatsAPI;

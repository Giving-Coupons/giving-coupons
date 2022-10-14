import { ApiPromise } from '../types/api';
import { CampaignListData } from '../types/campaigns';
import BaseAPI from './base';

class CampaignsAPI extends BaseAPI {
  static CAMPAIGNS_URL = 'campaigns';

  public list(): ApiPromise<CampaignListData[]> {
    return this.get(CampaignsAPI.CAMPAIGNS_URL);
  }
}

export default CampaignsAPI;

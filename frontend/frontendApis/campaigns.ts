import { ApiPromise } from '../types/api';
import { CampaignAdminListData, CampaignListData } from '../types/campaigns';
import BaseAPI from './base';

class CampaignsAPI extends BaseAPI {
  static CAMPAIGNS_URL = 'campaigns';

  public list(): ApiPromise<CampaignListData[]> {
    return this.get(CampaignsAPI.CAMPAIGNS_URL);
  }

  public adminList(): ApiPromise<CampaignAdminListData[]> {
    return this.get(`${CampaignsAPI.CAMPAIGNS_URL}/admin_index`);
  }
}

export default CampaignsAPI;

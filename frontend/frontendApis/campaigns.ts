import { ApiPromise } from '../types/api';
import { CampaignAdminData, CampaignAdminListData, CampaignListData } from '../types/campaigns';
import BaseAPI from './base';

class CampaignsAPI extends BaseAPI {
  static CAMPAIGNS_URL = 'campaigns';

  public list(): ApiPromise<CampaignListData[]> {
    return this.get(CampaignsAPI.CAMPAIGNS_URL);
  }

  public adminList(): ApiPromise<CampaignAdminListData[]> {
    return this.get(`${CampaignsAPI.CAMPAIGNS_URL}/admin_index`);
  }

  public adminGet(id: number): ApiPromise<CampaignAdminData> {
    return this.get(`${CampaignsAPI.CAMPAIGNS_URL}/${id}/admin_show`);
  }

  public deleteCampaign(id: number): ApiPromise<CampaignAdminData> {
    return this.delete(`${CampaignsAPI.CAMPAIGNS_URL}/${id}`);
  }
}

export default CampaignsAPI;

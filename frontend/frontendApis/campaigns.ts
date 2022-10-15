import { ApiPromise } from '../types/api';
import { CampaignAdminData, CampaignAdminListData, CampaignListData, CampaignPublicData } from '../types/campaigns';
import BaseAPI from './base';

class CampaignsAPI extends BaseAPI {
  static CAMPAIGNS_URL = 'campaigns';

  public list(): ApiPromise<CampaignListData[]> {
    return this.get(CampaignsAPI.CAMPAIGNS_URL);
  }

  public adminList(): ApiPromise<CampaignAdminListData[]> {
    return this.get(`${CampaignsAPI.CAMPAIGNS_URL}/admin_index`);
  }

  public getCampaign(id: number): ApiPromise<CampaignPublicData> {
    return this.get(`${CampaignsAPI.CAMPAIGNS_URL}/${id}`);
  }

  public adminGet(id: number): ApiPromise<CampaignAdminData> {
    return this.get(`${CampaignsAPI.CAMPAIGNS_URL}/${id}/admin_show`);
  }
}

export default CampaignsAPI;

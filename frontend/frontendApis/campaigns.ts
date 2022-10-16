import { ApiPromise } from '../types/api';
import {
  CampaignAdminData,
  CampaignAdminListData,
  CampaignListData,
  CampaignPublicData,
  CampaignPostData,
  CampaignPutData,
} from '../types/campaigns';
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

  public addCampaign(campaignPostData: CampaignPostData): ApiPromise<CampaignAdminData> {
    return this.post(CampaignsAPI.CAMPAIGNS_URL, campaignPostData);
  }

  public getCampaign(id: number): ApiPromise<CampaignPublicData> {
    return this.get(`${CampaignsAPI.CAMPAIGNS_URL}/${id}`);
  }

  public putCampaign(id: number, campaignPutData: CampaignPutData): ApiPromise<CampaignAdminData> {
    return this.put(`${CampaignsAPI.CAMPAIGNS_URL}/${id}`, campaignPutData);
  }

  public deleteCampaign(id: number): ApiPromise<CampaignAdminData> {
    return this.delete(`${CampaignsAPI.CAMPAIGNS_URL}/${id}`);
  }
}

export default CampaignsAPI;

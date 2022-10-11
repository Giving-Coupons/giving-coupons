import { Nullable } from './utils';
import { Moment } from 'moment';

export type CampaignListData = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  charities: CampaignCharityData[];
  donations: {
    primaryDonor: CampaignDonationData;
    secondaryDonors: CampaignDonationData;
  };
};

export type CampaignCharityData = {
  id: number;
  name: string;
  logoUrl: string;
};

export type CampaignDonationData = {
  amount: number;
  fraction: number;
};

export type CampaignSearchFormData = {
  name?: string;
  status: {
    isActive: boolean;
    isUpcoming: boolean;
    isCompleted: boolean;
  };
  startDateFrom: Nullable<Moment>;
  startDateTo: Nullable<Moment>;
  endDateFrom: Nullable<Moment>;
  endDateTo: Nullable<Moment>;
};

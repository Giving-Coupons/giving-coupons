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

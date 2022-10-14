import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import Head from 'next/head';
import CampaignInfoView from '../../../components/campaigns/dashboard/CampaignInfoView';
import { CampaignAdminData } from '../../../types/campaigns';
import moment from 'moment';
import { campaignImageBase64, logoBase64 } from '../../../utils/examples';
import { CampaignCharityData, CampaignCharityDonationData } from '../../../types/campaignCharities';
import { DonationBreakdownData } from '../../../types/donations';
import { CouponListData } from '../../../types/coupons';

const sampleCampaignCharities: CampaignCharityData[] = [
  { id: 1, charity: { id: 1, name: 'Ark', logoBase64: logoBase64 }, givingSgUrl: 'https://giving.sg' },
  { id: 2, charity: { id: 2, name: 'Bob', logoBase64: logoBase64 }, givingSgUrl: 'https://giving.sg' },
  { id: 3, charity: { id: 3, name: 'Charlie', logoBase64: logoBase64 }, givingSgUrl: 'https://giving.sg' },
];

const sampleCampaignCharitiesWithDonation: CampaignCharityDonationData[] = sampleCampaignCharities.map(
  (sampleCharities) => ({
    ...sampleCharities,
    primaryDonor: { amount: 60, fraction: 0.6 },
    secondaryDonors: { amount: 40, fraction: 0.4 },
  }),
);

const sampleDonations: DonationBreakdownData = {
  primaryDonor: { amount: 180, fraction: 0.6 },
  secondaryDonors: { amount: 120, fraction: 0.4 },
};

const sampleCoupons: CouponListData[] = [
  {
    id: 1,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: { id: 1, amount: 2, campaignCharityId: 1, couponId: 1 },
  },
  { id: 2, urlToken: 'abcdef', charity: null, campaignId: 1, denomination: 10, secondaryDonation: null },
  {
    id: 3,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: null,
  },
  { id: 4, urlToken: 'abcdef', charity: null, campaignId: 1, denomination: 10, secondaryDonation: null },
  { id: 5, urlToken: 'abcdef', charity: null, campaignId: 1, denomination: 10, secondaryDonation: null },
  {
    id: 6,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: null,
  },
  {
    id: 7,
    urlToken: 'abcdef',
    charity: { id: 2, name: 'Bob' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: { id: 2, amount: 8, campaignCharityId: 2, couponId: 7 },
  },
  {
    id: 8,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: null,
  },
  {
    id: 9,
    urlToken: 'abcdef',
    charity: { id: 1, name: 'Ark' },
    campaignId: 1,
    denomination: 10,
    secondaryDonation: null,
  },
];

const sampleCampaign: CampaignAdminData = {
  id: 1,
  name: 'Chicken Soup for the Soul',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales pretium felis, eget convallis magna consectetur vitae. Vestibulum aliquam at felis sed mattis. Nulla facilisi. Vivamus ultrices sed leo eget tempor. Sed gravida consectetur finibus. Proin accumsan sit amet ipsum ut posuere.',
  promisedAmount: 1000,
  couponDenomination: 10,
  start: moment().toISOString(),
  end: moment().toISOString(),
  imageBase64: campaignImageBase64,
  interestId: null,
  primaryDonor: {
    id: 1,
    name: 'Bob the Builder',
    email: 'canyoufixit@gmail.com',
  },
  charities: sampleCampaignCharitiesWithDonation,
  donations: sampleDonations,
  coupons: sampleCoupons,
};

const AdminCampaign = () => {
  return (
    <Box>
      <Head>
        <title>Manage Campaign</title>
      </Head>

      <Grid container>
        <Grid item sm={12} md={6}>
          <CampaignInfoView campaign={sampleCampaign} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminCampaign;

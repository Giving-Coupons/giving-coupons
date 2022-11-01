import { Container } from '@mui/material';
import { isInteger } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import CampaignLoading from '../../../components/campaigns/dashboard/CampaignLoading';
import CampaignPublicInfoCard from '../../../components/campaigns/dashboard/CampaignPublicInfoCard';
import api from '../../../frontendApis';
import { CampaignPublicData } from '../../../types/campaigns';
import { Nullable } from '../../../types/utils';
import { theme } from '../../../utils/theme';
import NotFound from '../../404';

export default function CampaignDetail() {
  const router = useRouter();
  const campaignId =
    router.query.campaignId && isInteger(router.query.campaignId) ? Number(router.query.campaignId) : null;

  const { data: campaign, error } = useSWR<Nullable<CampaignPublicData>>([campaignId], (campaignId) =>
    campaignId !== null ? api.campaigns.getCampaign(campaignId).then((res) => res.payload) : null,
  );

  const isLoading = !campaign && !error;

  if (isLoading) {
    // TODO: Replace skeleton
    return <CampaignLoading />;
  }

  if (!campaign) {
    return <NotFound entity="campaign" />;
  }

  return (
    <Container sx={{ padding: theme.spacing(2) }}>
      <Head>
        <title>{campaign.name}</title>
      </Head>

      <CampaignPublicInfoCard campaign={campaign} />
    </Container>
  );
}

import { isInteger } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ThankYou from '../../components/redeem/ThankYou';

const RedeemThankYouPage: NextPage = () => {
  const router = useRouter();
  const campaignId = router.query.campaignId;

  return <ThankYou campaignId={isInteger(campaignId) ? Number(campaignId) : undefined} />;
};
export default RedeemThankYouPage;

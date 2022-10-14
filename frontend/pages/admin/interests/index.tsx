import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import DeleteButton from '../../../components/DeleteButton';
import SimpleTable from '../../../components/generic/SimpleTable';
import IconButtonWithTooltip from '../../../components/IconButtonWithTooltip';
import Tabbed from '../../../components/Tabs';
import api from '../../../frontendApis';
import InterestsAPI from '../../../frontendApis/interests';
import useAdminLoginCheck from '../../../hooks/useAdminLogInCheck';
import { InterestData, InterestStatus } from '../../../types/interest';
import { Nullable } from '../../../types/utils';
import { DATE_FORMAT } from '../../../utils/constants';
import { theme } from '../../../utils/theme';

const Interests = () => {
  useAdminLoginCheck();
  const { data: interests, mutate } = useSWR<Nullable<InterestData[]>>(InterestsAPI.INTERESTS_URL, () =>
    api.interests.list().then((r) => r.payload),
  );
  const router = useRouter();

  const pendingInterests = interests?.filter((interest) => interest.status === InterestStatus.PENDING);
  const approvedInterests = interests?.filter((interest) => interest.status === InterestStatus.APPROVED);
  const rejectedInterests = interests?.filter((interest) => interest.status === InterestStatus.REJECTED);

  const makeInterestsTable = (interests: Nullable<InterestData[]> | undefined, status: InterestStatus) => {
    const approveAction = {
      component: <IconButtonWithTooltip icon={<AddIcon />} tooltip="Create campaign" />,
      onClick: (interest: InterestData) => {
        router.push({
          pathname: '/admin/campaigns/create',
          query: { interestId: interest.id },
        });
      },
    };

    const rejectAction = {
      component: <IconButtonWithTooltip icon={<ClearIcon />} tooltip="Reject" />,
      onClick: (interest: InterestData) => {
        api.interests.rejectInterest(interest.id).then(() => mutate());
      },
    };

    const deleteAction = {
      component: <DeleteButton />,
      onClick: (interest: InterestData) => {
        api.interests.deleteInterest(interest.id).then(() => mutate());
      },
    };

    return (
      <SimpleTable
        columns={[
          { title: 'ID', key: 'id' },
          { title: 'Donor Name', key: 'donorName' },
          { title: 'Donor Email', key: 'donorEmail' },
          { title: 'Campaign Name', key: 'campaignName' },
          { title: 'Campaign Description', key: 'campaignDescription' },
          { title: 'Promised Amount', key: 'promisedAmount' },
          { title: 'Start', key: 'start', transformValue: (date) => date.format(DATE_FORMAT) },
          { title: 'End', key: 'end', transformValue: (date) => date.format(DATE_FORMAT) },
          { title: 'Coupon Denomination', key: 'couponDenomination' },
        ]}
        rows={interests ?? []}
        isLoading={interests === undefined}
        actions={[
          ...(status === InterestStatus.PENDING ? [approveAction, rejectAction] : []), // Only pending interests can be approved/rejected
          ...(status !== InterestStatus.APPROVED ? [deleteAction] : []), // Approved interests cannot be deleted
        ]}
      />
    );
  };

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      <Typography variant="h1" gutterBottom>
        Interests
      </Typography>
      <Paper>
        <Tabbed
          tabs={[
            {
              label: 'Pending',
              content: makeInterestsTable(pendingInterests, InterestStatus.PENDING),
            },
            {
              label: 'Approved',
              content: makeInterestsTable(approvedInterests, InterestStatus.APPROVED),
            },
            {
              label: 'Rejected',
              content: makeInterestsTable(rejectedInterests, InterestStatus.REJECTED),
            },
          ]}
        />
      </Paper>
    </Box>
  );
};

export default Interests;

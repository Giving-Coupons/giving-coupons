import { Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import {
  descriptionContainerSx,
  imageContainerSx,
} from '../../../styles/components/campaigns/list/CampaignListLoadingStyles';
import { containerSx } from '../../../styles/components/generic/CardWithImageStyles';

const CampaignListCardLoading = () => {
  return (
    <Stack component="div" sx={containerSx}>
      <Stack sx={imageContainerSx}>
        <Skeleton variant="rectangular" height="90%" width="90%" />
      </Stack>

      <Stack sx={descriptionContainerSx} component="div" spacing={1}>
        <Skeleton variant="rectangular" />

        <Skeleton variant="rectangular" />

        <Skeleton variant="rectangular" />
      </Stack>
    </Stack>
  );
};

export default CampaignListCardLoading;

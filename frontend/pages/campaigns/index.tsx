import SearchIcon from '@mui/icons-material/Search';
import { Fab, Typography, useMediaQuery } from '@mui/material';
import { Box, Container, Stack, useTheme } from '@mui/system';
import Head from 'next/head';
import { useState } from 'react';
import useSWR from 'swr';
import CampaignList from '../../components/campaigns/list/CampaignList';
import CampaignListLoading from '../../components/campaigns/list/CampaignListLoading';
import CampaignSearch from '../../components/campaigns/search/CampaignSearch';
import ErrorDisplay from '../../components/generic/ErrorDisplay';
import api from '../../frontendApis';
import CampaignsAPI from '../../frontendApis/campaigns';
import { containerSx, messageContainerSx, mobileSearchButtonSx, stackSx } from '../../styles/campaigns/indexStyles';
import { CampaignListData, CampaignListQueryParams } from '../../types/campaigns';
import { Nullable } from '../../types/utils';
import { log } from '../../utils/analytics';

const Campaigns = () => {
  const defaultQueryParams = {
    status: {
      isActive: true,
      isUpcoming: false,
      isCompleted: false,
    },
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchDrawerIsOpen, setSearchDrawerIsOpen] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<CampaignListQueryParams>(defaultQueryParams);
  const { data: campaigns, error } = useSWR<Nullable<CampaignListData[]>>(
    [CampaignsAPI.CAMPAIGNS_URL, queryParams],
    () => api.campaigns.list(queryParams).then((r) => r.payload),
  );
  const isLoading = !campaigns && !error;
  const hasLoadedSuccessfully = campaigns && !error;

  return (
    <Box>
      <Head>
        <title>Campaigns</title>
      </Head>

      <Container sx={containerSx} component="main">
        <Stack sx={stackSx} component="div" direction="row" spacing={2}>
          <CampaignSearch
            searchDrawerIsOpen={searchDrawerIsOpen}
            setSearchDrawerIsOpen={setSearchDrawerIsOpen}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            handleReset={() => setQueryParams(defaultQueryParams)}
          />

          {isLoading && <CampaignListLoading />}

          {error && <ErrorDisplay />}

          {hasLoadedSuccessfully && campaigns.length > 0 && <CampaignList campaigns={campaigns} />}

          {hasLoadedSuccessfully && campaigns.length === 0 && (
            <Stack sx={messageContainerSx} component="div">
              <Typography variant="h2" align="center">
                No campaigns found
              </Typography>
            </Stack>
          )}

          {isMobile && (
            <Fab
              sx={mobileSearchButtonSx}
              onClick={() => {
                log('CampaignList_clickSearchFAB');
                setSearchDrawerIsOpen(true);
              }}
            >
              <SearchIcon fontSize="large" />
            </Fab>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Campaigns;

import { Box, Container, Stack, useTheme } from '@mui/system';
import { CampaignListData, CampaignListQueryParams } from '../../types/campaigns';
import Head from 'next/head';
import CampaignList from '../../components/campaigns/list/CampaignList';
import { Fab, Typography, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import CampaignSearch from '../../components/campaigns/search/CampaignSearch';
import { containerSx, messageContainerSx, mobileSearchButtonSx } from '../../styles/pages/campaigns/indexStyles';
import useSWR from 'swr';
import { Nullable } from '../../types/utils';
import api from '../../frontendApis';
import CampaignsAPI from '../../frontendApis/campaigns';
import CampaignListLoading from '../../components/campaigns/list/CampaignListLoading';

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
        <CampaignSearch
          searchDrawerIsOpen={searchDrawerIsOpen}
          setSearchDrawerIsOpen={setSearchDrawerIsOpen}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          handleReset={() => setQueryParams(defaultQueryParams)}
        />

        {isLoading && <CampaignListLoading />}

        {error && (
          <Stack sx={messageContainerSx} spacing={2}>
            <Typography variant="h1">Error</Typography>
            <Typography variant="h2">That is all we know right now.</Typography>
          </Stack>
        )}

        {hasLoadedSuccessfully && campaigns.length > 0 && <CampaignList campaigns={campaigns} />}

        {hasLoadedSuccessfully && campaigns.length === 0 && (
          <Stack sx={messageContainerSx} component="div">
            <Typography variant="h2" align="center">
              There are no campaigns for this search query
            </Typography>
          </Stack>
        )}

        {isMobile && (
          <Fab sx={mobileSearchButtonSx} onClick={() => setSearchDrawerIsOpen(true)}>
            <SearchIcon fontSize="large" />
          </Fab>
        )}
      </Container>
    </Box>
  );
};

export default Campaigns;

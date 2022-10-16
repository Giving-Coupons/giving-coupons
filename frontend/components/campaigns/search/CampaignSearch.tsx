import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import CampaignSearchDrawer from './CampaignSearchDrawer';
import CampaignSearchForm from './CampaignSearchForm';
import { CampaignListQueryParams, CampaignSearchFormData } from '../../../types/campaigns';
import moment from 'moment';
import { isIsoDateString } from '../../../utils/dates';

interface Props {
  searchDrawerIsOpen: boolean;
  setSearchDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
  queryParams: CampaignListQueryParams;
  setQueryParams: Dispatch<SetStateAction<CampaignListQueryParams>>;
}

const CampaignSearch = ({ searchDrawerIsOpen, setSearchDrawerIsOpen, queryParams, setQueryParams }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const search = (values: CampaignSearchFormData) => {
    setQueryParams({
      ...values,
      start: {
        from: values.startDateFrom?.toISOString(),
        to: values.startDateTo?.toISOString(),
      },
      end: {
        from: values.endDateFrom?.toISOString(),
        to: values.endDateTo?.toISOString(),
      },
    });
  };

  const convertQueryParamsToSearchFormValues = (params: CampaignListQueryParams): CampaignSearchFormData => ({
    ...params,
    startDateFrom: isIsoDateString(params.start?.from) ? moment(params.start?.from) : null,
    startDateTo: isIsoDateString(params.start?.to) ? moment(params.start?.to) : null,
    endDateFrom: isIsoDateString(params.end?.from) ? moment(params.end?.from) : null,
    endDateTo: isIsoDateString(params.end?.to) ? moment(params.end?.to) : null,
  });

  const searchForm = (
    <CampaignSearchForm initialValues={convertQueryParamsToSearchFormValues(queryParams)} search={search} />
  );

  return isMobile ? (
    <CampaignSearchDrawer isOpen={searchDrawerIsOpen} setIsOpen={setSearchDrawerIsOpen} searchForm={searchForm} />
  ) : (
    searchForm
  );
};

export default CampaignSearch;

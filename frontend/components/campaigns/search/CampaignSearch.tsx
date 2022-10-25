import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';
import { CampaignListQueryParams, CampaignSearchFormData } from '../../../types/campaigns';
import { isIsoDateString } from '../../../utils/dates';
import CampaignSearchDrawer from './CampaignSearchDrawer';
import CampaignSearchForm, { campaignSearchFormSchema } from './CampaignSearchForm';

interface Props {
  searchDrawerIsOpen: boolean;
  setSearchDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
  queryParams: CampaignListQueryParams;
  setQueryParams: Dispatch<SetStateAction<CampaignListQueryParams>>;
  handleReset: () => void;
}

const CampaignSearch = ({
  searchDrawerIsOpen,
  setSearchDrawerIsOpen,
  queryParams,
  setQueryParams,
  handleReset,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const search = (values: Yup.InferType<typeof campaignSearchFormSchema>) => {
    setSearchDrawerIsOpen(false);
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

  const handleSearchReset = () => {
    setSearchDrawerIsOpen(false);
    handleReset();
  };

  const convertQueryParamsToSearchFormValues = (params: CampaignListQueryParams): CampaignSearchFormData => ({
    ...params,
    startDateFrom: isIsoDateString(params.start?.from) ? moment(params.start?.from) : null,
    startDateTo: isIsoDateString(params.start?.to) ? moment(params.start?.to) : null,
    endDateFrom: isIsoDateString(params.end?.from) ? moment(params.end?.from) : null,
    endDateTo: isIsoDateString(params.end?.to) ? moment(params.end?.to) : null,
  });

  const searchForm = (
    <CampaignSearchForm
      initialValues={convertQueryParamsToSearchFormValues(queryParams)}
      search={search}
      handleReset={handleSearchReset}
    />
  );

  return isMobile ? (
    <CampaignSearchDrawer isOpen={searchDrawerIsOpen} setIsOpen={setSearchDrawerIsOpen} searchForm={searchForm} />
  ) : (
    searchForm
  );
};

export default CampaignSearch;

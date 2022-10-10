import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import CampaignSearchDrawer from './CampaignSearchDrawer';
import CampaignSearchForm from './CampaignSearchForm';
import { CampaignSearchFormData } from '../../../types/campaigns';

interface Props {
  searchDrawerIsOpen: boolean;
  setSearchDrawerIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CampaignSearch = ({ searchDrawerIsOpen, setSearchDrawerIsOpen }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [values, setValues] = useState<CampaignSearchFormData>({
    name: undefined,
    status: {
      isActive: true,
      isUpcoming: false,
      isCompleted: false,
    },
    startDateFrom: null,
    startDateTo: null,
    endDateFrom: null,
    endDateTo: null,
  });

  // TODO: Add API once available
  const search = (values: CampaignSearchFormData) => {
    setValues(values);
  };

  const searchForm = <CampaignSearchForm initialValues={values} search={search} />;

  return isMobile ? (
    <CampaignSearchDrawer isOpen={searchDrawerIsOpen} setIsOpen={setSearchDrawerIsOpen} searchForm={searchForm} />
  ) : (
    searchForm
  );
};

export default CampaignSearch;

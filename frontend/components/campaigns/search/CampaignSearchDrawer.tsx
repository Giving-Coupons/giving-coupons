import { Drawer } from '@mui/material';
import { Container } from '@mui/system';
import { Dispatch, SetStateAction } from 'react';
import { drawerPaperSx } from '../../../styles/components/campaigns/search/CampaignSearchDrawerStyles';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  searchForm: JSX.Element;
}

const CampaignSearchDrawer = ({ isOpen, setIsOpen, searchForm }: Props) => {
  return (
    <Drawer PaperProps={{ sx: drawerPaperSx }} anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
      <Container component="div">{searchForm}</Container>
    </Drawer>
  );
};

export default CampaignSearchDrawer;

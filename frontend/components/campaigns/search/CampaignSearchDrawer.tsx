import { Drawer } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { drawerPaperSx } from '../../../styles/components/campaigns/search/CampaignSearchDrawerStyles';
import { Container } from '@mui/system';

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

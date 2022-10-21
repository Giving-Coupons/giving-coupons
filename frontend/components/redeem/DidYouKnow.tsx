import { Box, Stack, Typography } from '@mui/material';
import { TextLoop } from 'react-text-loop-next';
import { boxSx, stackSx, textSx } from '../../styles/redeem/DidYouKnowStyles';

// TODO: Change this if needed
const DID_YOU_KNOW_FACTS: string[] = [
  '$5 can cover a round trip for seniors or the disabled to their medical appointments',
  '$2 can feed a hungry neighbour',
  '$5 can cover a round trip for seniors or the disabled to their medical appointments',
  '$10 pays for 5 breakfasts for the elderly at nursing homes',
  '$30 can provide children with help for their education',
  '$100 can support a secondary school student for a month',
];

const DidYouKnow = () => {
  return (
    <Stack component="div" sx={stackSx}>
      <Typography variant="h4">Did you know?</Typography>

      <Box sx={boxSx}>
        <TextLoop noWrap={false} interval={5000} springConfig={{ stiffness: 250, damping: 10 }}>
          {DID_YOU_KNOW_FACTS.map((fact, index) => (
            <Typography key={index} sx={textSx}>
              {fact}
            </Typography>
          ))}
        </TextLoop>
      </Box>
    </Stack>
  );
};

export default DidYouKnow;

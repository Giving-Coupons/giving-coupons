import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { boxSx, stackSx, textSx } from '../../styles/components/redeem/DidYouKnowStyles';

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
  const [factIndex, setfactIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setfactIndex((prevIndex) => (prevIndex + 1) % DID_YOU_KNOW_FACTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [factIndex]);

  return (
    <Stack component="div" sx={stackSx}>
      <Typography variant="h4">Did you know?</Typography>

      <Box sx={boxSx}>
        <Typography sx={textSx}>{DID_YOU_KNOW_FACTS[factIndex]}</Typography>
      </Box>
    </Stack>
  );
};

export default DidYouKnow;

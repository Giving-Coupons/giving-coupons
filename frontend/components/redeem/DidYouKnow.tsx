import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { stackSx } from '../../styles/components/redeem/DidYouKnowStyles';

// TODO: Change this if needed
const DID_YOU_KNOW_FACTS: string[] = [
  '$2 can feed a hungry neighbour',
  '$5 can cover a round trip for seniors or the disabled to their medical appointments',
  '$10 pays for 5 breakfasts for the elderly at nursing homes',
  '$30 can provide children with help for their education',
  '$100 can support a secondary school student for a month',
];

const DidYouKnow = () => {
  const [factIndex, setFactIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % DID_YOU_KNOW_FACTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [factIndex]);

  return (
    <Stack component="div" sx={stackSx} spacing={1}>
      <Typography variant="h4">Did you know?</Typography>

      <Typography align="center" variant="h5">
        {DID_YOU_KNOW_FACTS[factIndex]}
      </Typography>
    </Stack>
  );
};

export default DidYouKnow;

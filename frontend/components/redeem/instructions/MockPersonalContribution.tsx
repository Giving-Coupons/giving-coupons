import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { mockTextFieldSx } from '../../../styles/components/redeem/MockPersonalContributionStyles';
import { givingSgLogoSx } from '../../../styles/components/redeem/RedeemStyles';

const MockPersonalContribution = () => {
  return (
    <Stack component="div" spacing={2}>
      <Stack component="div" alignItems="center" spacing={1}>
        <Typography variant="h5" align="center">
          Do you want to add a personal contribution too?
        </Typography>

        <Typography variant="caption" align="center">
          Your donation will be securely transferred through{' '}
          <Box sx={givingSgLogoSx} component="img" src="/giving-sg-logo.png" />
        </Typography>
      </Stack>

      <Stack component="div" alignItems="center">
        <TextField
          sx={mockTextFieldSx}
          size="small"
          label="Amount"
          InputLabelProps={{ shrink: true }}
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="caption">$</Typography>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
};

export default MockPersonalContribution;

import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Button from '../components/generic/Button';
import RandomKawaii from '../components/notFound/RandomKawaii';

interface Props {
  entity?: string;
  message?: string;
}

function NotFound({ entity = 'page', message }: Props) {
  const router = useRouter();

  message = message || `The ${entity} you are looking for does not exist.`;

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <RandomKawaii isHappy={false} size={200} />

      {message && (
        <Typography align="center" variant="h3">
          {message}
        </Typography>
      )}

      <Button actionType="secondary" onClick={() => router.back()}>
        Go back
      </Button>
    </Stack>
  );
}

export default NotFound;

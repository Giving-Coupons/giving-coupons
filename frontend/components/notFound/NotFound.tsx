import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import RandomKawaii from '../../components/notFound/RandomKawaii';
import Button from '../generic/Button';

interface Props {
  message?: string;
}

function NotFound({ message }: Props) {
  const router = useRouter();
  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <RandomKawaii isHappy={false} size={200} />

      {message && <Typography className="mt-1 text-gray-400">{message}</Typography>}

      <Button actionType="secondary" onClick={() => router.back()}>
        Go back
      </Button>
    </Stack>
  );
}

export default NotFound;

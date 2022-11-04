import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import NotFound from '../../pages/404';
import { log } from '../../utils/analytics';
import RandomKawaii from '../RandomKawaii';
import Button from './Button';

type Props = {
  message?: string;
  entity?: string;
  statusCode?: number;
};

function ErrorDisplay({ message, entity, statusCode }: Props) {
  const router = useRouter();

  // Temporary magic number, to use enum HttpStatusCode.NOT_FOUND once
  // https://github.com/axios/axios/issues/5126 is fixed.
  if (statusCode === 404) {
    return <NotFound entity={entity} />;
  }

  message = message || 'Something went wrong. Please wait and try again.';

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <RandomKawaii isHappy={false} size={200} />

      {message && (
        <Typography align="center" variant="h3">
          {message}
        </Typography>
      )}

      <Button
        actionType="secondary"
        onClick={() => {
          log("[ErrorDisplay] Click 'Reload' button");
          router.reload();
        }}
      >
        Reload
      </Button>
    </Stack>
  );
}

export default ErrorDisplay;

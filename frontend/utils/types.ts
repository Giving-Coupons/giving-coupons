import { SxProps } from '@mui/system';

export const combineSxProps = (...props: SxProps[]) => {
  return props.reduce(
    (resultProps, prop) => [
      ...(Array.isArray(resultProps) ? resultProps : [resultProps]),
      ...(Array.isArray(prop) ? prop : [prop]),
    ],
    [],
  );
};

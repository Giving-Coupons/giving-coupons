import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface Props extends MuiButtonProps {
  actionType: 'primary' | 'secondary' | 'tertiary' | 'muted';
}

const Button = ({ actionType, children, ...rest }: Props) => {
  switch (actionType) {
    case 'primary':
      return (
        <MuiButton color="primary" variant="contained" {...rest}>
          {children}
        </MuiButton>
      );
    case 'secondary':
      return (
        <MuiButton color="primary" variant="outlined" {...rest}>
          {children}
        </MuiButton>
      );
    case 'tertiary':
      return (
        <MuiButton color="primary" variant="text" {...rest}>
          {children}
        </MuiButton>
      );
    case 'muted':
      return (
        <MuiButton color="neutral" variant="outlined" {...rest}>
          {children}
        </MuiButton>
      );
    default:
      return null;
  }
};

export default Button;

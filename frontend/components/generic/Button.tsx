import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import React from 'react';

interface Props extends MuiButtonProps {
  actionType: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'danger';
  // Note: Using this because of https://github.com/mui/material-ui/issues/16846
  isLabel?: boolean;
}

const Button = ({ actionType, isLabel = false, children, ...rest }: Props) => {
  const component = isLabel ? 'label' : 'button';

  switch (actionType) {
    case 'primary':
      return (
        <MuiButton component={component} color="primary" variant="contained" {...rest}>
          {children}
        </MuiButton>
      );
    case 'secondary':
      return (
        <MuiButton component={component} color="primary" variant="outlined" {...rest}>
          {children}
        </MuiButton>
      );
    case 'tertiary':
      return (
        <MuiButton component={component} color="primary" variant="text" {...rest}>
          {children}
        </MuiButton>
      );
    case 'muted':
      return (
        <MuiButton component={component} color="neutral" variant="outlined" {...rest}>
          {children}
        </MuiButton>
      );
    case 'danger':
      return (
        <MuiButton component={component} color="error" variant="outlined" {...rest}>
          {children}
        </MuiButton>
      );
    default:
      return null;
  }
};

export default Button;

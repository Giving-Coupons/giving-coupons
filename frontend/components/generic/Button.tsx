import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { Map } from 'immutable';

interface Props extends MuiButtonProps {
  actionType: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'mutedWithoutOutline' | 'danger';
  // Note: Using this because of https://github.com/mui/material-ui/issues/16846
  isLabel?: boolean;
}

const buttonPropsMap = Map<Props['actionType'], Omit<Props, 'actionType'>>({
  primary: {
    color: 'primary',
    variant: 'contained',
  },
  secondary: {
    color: 'primary',
    variant: 'outlined',
  },
  tertiary: {
    color: 'primary',
    variant: 'text',
  },
  muted: {
    color: 'neutral',
    variant: 'outlined',
  },
  mutedWithoutOutline: {
    color: 'neutral',
    variant: 'text',
  },
  danger: {
    color: 'error',
    variant: 'outlined',
  },
});

const Button = ({ actionType, isLabel = false, children, ...rest }: Props) => {
  const component = isLabel ? 'label' : 'button';

  return (
    <MuiButton component={component} {...buttonPropsMap.get(actionType)} {...rest}>
      {children}
    </MuiButton>
  );
};

export default Button;

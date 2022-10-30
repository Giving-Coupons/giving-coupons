import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  status: PropTypes.string,
};

const defaultProps = {
  children: null,
  status: false,
};

const FormHint = ({ children, className, status, ...props }) => {
  const classes = classNames('form-hint', status && `text-color-${status}`, className);

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

FormHint.propTypes = propTypes;
FormHint.defaultProps = defaultProps;

export default FormHint;

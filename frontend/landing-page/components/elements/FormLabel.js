import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  labelHidden: PropTypes.bool,
  id: PropTypes.string,
};

const defaultProps = {
  children: null,
  labelHidden: false,
  id: null,
};

const FormLabel = ({ className, children, labelHidden, id, ...props }) => {
  const classes = classNames('form-label', labelHidden && 'screen-reader', className);

  return (
    <label {...props} className={classes} htmlFor={id}>
      {children}
    </label>
  );
};

FormLabel.propTypes = propTypes;
FormLabel.defaultProps = defaultProps;

export default FormLabel;

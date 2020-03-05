import React from 'react';
import PropTypes from 'prop-types';
import warning from './warning';

const spacer = props => {
  let { amount } = props;
  const nbsps = [];
  let initial = 0;

  if (__DEV__) {
    if (amount < 1) {
      warning(false, 'Zero and Negative amounts not allowed. For Zero amount 1 will be used. For Negative amounts a positive version will be used.');
    }
  }

  if (amount === 0) {
    amount += 1;
  }

  amount = Math.abs(amount);

  while (initial < amount) {
    nbsps.push(<React.Fragment key={initial}>&nbsp;</React.Fragment>);
    initial += 1;
  }

  return (
    <React.Fragment>
      {nbsps}
    </React.Fragment>
  );
};

spacer.propTypes = {
  amount: PropTypes.number,
};

spacer.defaultProps = {
  amount: 1,
};

export default spacer;

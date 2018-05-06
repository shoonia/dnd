import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ children }) => (
  <div className="row justify-content-center">
    <div className="col-8 col-md-6">
      {children}
    </div>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.any
};

export default Wrapper;

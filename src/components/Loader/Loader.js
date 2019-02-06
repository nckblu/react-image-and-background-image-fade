import React from "react";
import Wrapper from "./elements/Wrapper";
import defaults from "../defaults";
import PropTypes from "prop-types";

export const Loader = ({ isOnTop, hasLoaded, transitionTime }) => (
  <Wrapper
    isOnTop={isOnTop}
    hasLoaded={hasLoaded}
    transitionTime={transitionTime}
  />
);

Loader.propTypes = {
  isOnTop: PropTypes.bool,
  hasLoaded: PropTypes.bool,
  transitionTime: PropTypes.string,
};

Loader.defaultProps = {
  transitionTime: defaults.transitionTime,
};

export default Loader;

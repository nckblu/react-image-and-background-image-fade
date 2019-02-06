import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Loader from "../Loader";
import ImageLoader from "../ImageLoader";
import Wrapper from "./elements/Wrapper";
import Img from "./elements/Img";
import defaults from "../defaults";

export const Image = ({
  src,
  width,
  height,
  transitionTime,
  renderLoader,
  disablePlaceholder,
  ...props
}) => (
  <ImageLoader
    src={src}
    width={width}
    height={height}
    transitionTime={transitionTime}
    renderLoader={renderLoader}
    disablePlaceholder={disablePlaceholder}
  >
    {({
      hasLoaded,
      shouldShowLoader,
      hasFailed,
      src,
      transitionTime,
      disablePlaceholder,
      renderLoader,
    }) => {
      return (
        <Wrapper width={width} height={height}>
          {hasLoaded && (
            <Img src={src} transitionTime={transitionTime} {...props} />
          )}
          {shouldShowLoader && !disablePlaceholder && (
            <Fragment>
              {renderLoader ? (
                renderLoader({ hasLoaded, hasFailed })
              ) : (
                <Loader />
              )}
            </Fragment>
          )}
        </Wrapper>
      );
    }}
  </ImageLoader>
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  transitionTime: PropTypes.string,
  renderLoader: PropTypes.func,
  disablePlaceholder: PropTypes.bool,
};

Image.defaultProps = {
  transitionTime: defaults.transitionTime,
};

export default Image;

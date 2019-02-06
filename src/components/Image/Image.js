import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../Loader";
import ImageLoader from "../ImageLoader";
import { fadeIn } from "../../keyframes";

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
  transitionTime: "0.3s",
};

export default Image;

const Img = styled.img`
  width: 100%;
  height: 100%;
  animation: ${fadeIn} ${props => props.transitionTime} ease;
`;

const Wrapper = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`;

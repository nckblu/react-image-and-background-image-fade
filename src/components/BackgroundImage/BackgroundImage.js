import React, { Fragment } from "react";
import Loader from "../Loader";
import ImageLoader from "../ImageLoader";
import { Wrapper } from "./elements/Wrapper";
import PropTypes from "prop-types";

export const BackgroundImage = ({
  src,
  width,
  height,
  transitionTime,
  renderLoader,
  disablePlaceholder,
  useChild,
  children,
  element,
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
      /*
       * Preserve initial styles if the style prop is being used either on the
       * child or a pass through prop to the BackgroundImage element
       */
      const style =
        children && children.props && children.props.style
          ? { ...children.props.style }
          : {};

      if (hasLoaded) {
        style.backgroundImage = `url("${src}")`;
      }

      let childElement;
      if (useChild) {
        /*
         * When in useChild mode we need to clone the child, append the style
         * and add relative positioning for the loader.
         */
        childElement = React.cloneElement(children, { style });
        style.position = "relative";
      } else {
        /*
         * When not in useChild mode we need to create a new element based on
         * the element prop, apply the styles and include the current children
         */
        style.width = width;
        style.height = height;
        childElement = React.createElement(
          element,
          { ...props, style },
          children
        );
      }

      return (
        <Wrapper width={width} height={height}>
          {childElement}
          {shouldShowLoader && !disablePlaceholder && (
            <Fragment>
              {renderLoader ? (
                renderLoader({ hasLoaded, hasFailed })
              ) : (
                <Loader
                  isOnTop
                  hasLoaded={hasLoaded}
                  transitionTime={transitionTime}
                />
              )}
            </Fragment>
          )}
        </Wrapper>
      );
    }}
  </ImageLoader>
);

BackgroundImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  transitionTime: PropTypes.string,
  renderLoader: PropTypes.func,
  disablePlaceholder: PropTypes.bool,
  useChild: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  element: PropTypes.string,
};

BackgroundImage.defaultProps = {
  transitionTime: "0.3s",
  element: "div",
};

export default BackgroundImage;

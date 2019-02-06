import React, { Fragment } from "react";
import Loader from "../Loader";
import ImageLoader from "../ImageLoader";
import { Wrapper } from "./elements/Wrapper";
import PropTypes from "prop-types";
import defaults from "../../defaults";

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
  lazyLoad,
  wrapperClassName,
  ...props
}) => (
  <ImageLoader
    src={src}
    transitionTime={transitionTime}
    renderLoader={renderLoader}
    disablePlaceholder={disablePlaceholder}
    lazyLoad={lazyLoad}
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
      const backgroundImageStyle = { backgroundImage: `url("${src}")` };
      let style;
      let childElement;
      if (useChild) {
        /*
         * When in useChild mode we need to clone the child, append the style
         * and add relative positioning for the loader.
         */
        style =
          children && children.props && children.props.style
            ? { ...children.props.style }
            : {};
        style.position = "relative";
        hasLoaded ? (style = { ...style, ...backgroundImageStyle }) : style;
        childElement = React.cloneElement(children, { style });
      } else {
        /*
         * When not in useChild mode we need to create a new element based on
         * the element prop, apply the styles and include the current children
         */
        style = props.style ? { ...props.style } : {};
        style.width = width;
        style.height = height;
        hasLoaded ? (style = { ...style, ...backgroundImageStyle }) : style;
        childElement = React.createElement(
          element,
          { ...props, style },
          children
        );
      }

      return (
        <Wrapper width={width} height={height} className={wrapperClassName}>
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
  width: PropTypes.string,
  height: PropTypes.string,
  transitionTime: PropTypes.string,
  renderLoader: PropTypes.func,
  disablePlaceholder: PropTypes.bool,
  useChild: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  element: PropTypes.string,
  style: PropTypes.object,
  wrapperClassName: PropTypes.string,
};

BackgroundImage.defaultProps = {
  transitionTime: defaults.transitionTime,
  element: "div",
};

export default BackgroundImage;

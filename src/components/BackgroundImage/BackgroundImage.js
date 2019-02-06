import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import preloader from "image-preloader";
import Loader from "../Loader";
import { cssTimeToMs } from "../../util";
import ImageLoader from "../ImageLoader";
import { fadeIn } from "../../keyframes";
import { relative } from "path";

export const BackgroundImage = ({
  src,
  width,
  height,
  transitionTime,
  renderLoader,
  disablePlaceholder,
  useChild,
  children,
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
      if (useChild) {
        // Preserve initial styles if the style prop is being used on the child element
        const initialStyles = children.props.style
          ? { ...children.props.style }
          : {};

        const styles = {
          position: relative, // Component requires relevant positioning to accomodate the loader
        };

        if (hasLoaded) {
          styles.backgroundImage = `url("${src}")`;
        }
        const newChild = React.cloneElement(children, { styles });
      } else {
        return <span />;
      }
    }}
  </ImageLoader>
);
BackgroundImage.defaultProps = {
  transitionTime: "0.3s",
};

export default BackgroundImage;

const Wrapper = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  animation: ${fadeIn} ${props => props.transitionTime} ease;
`;

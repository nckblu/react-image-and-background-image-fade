import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import preloader from "image-preloader";
import { cssTimeToMs } from "../../util";
import { fadeIn } from "../../keyframes";

export class ImageLoader extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    transitionTime: PropTypes.string,
    renderLoader: PropTypes.func,
    disablePlaceholder: PropTypes.bool,
  };

  state = {
    hasLoaded: false,
    hasFailed: false,
    shouldShowLoader: true,
  };

  componentDidMount() {
    const { src } = this.props;
    preloader
      .simplePreload(src)
      .then(this.handleImageLoaderLoaded)
      .catch(this.handleImageLoaderFailed);
  }

  render() {
    const {
      src,
      width,
      height,
      transitionTime,
      renderLoader,
      disablePlaceholder,
      children,
    } = this.props;
    console.log("src", src);
    const { hasLoaded, hasFailed, shouldShowLoader } = this.state;
    return children({
      hasLoaded,
      shouldShowLoader,
      hasFailed,
      src,
      transitionTime,
      disablePlaceholder,
      renderLoader,
    });
  }

  handleImageLoaderLoaded = () => {
    const { transitionTime } = this.props;
    const hideLoaderDelay = cssTimeToMs(transitionTime);
    this.setState({ hasLoaded: true }, () => {
      setTimeout(() => {
        this.setState({
          shouldShowLoader: false,
        });
      }, hideLoaderDelay);
    });
  };
}

ImageLoader.defaultProps = {
  transitionTime: "0.3s",
};

export default ImageLoader;

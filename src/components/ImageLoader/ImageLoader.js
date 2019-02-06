import React from "react";
import PropTypes from "prop-types";
import preloader from "image-preloader";
import { cssTimeToMs } from "../../util";
import defaults from "../defaults";

export class ImageLoader extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    transitionTime: PropTypes.string,
    renderLoader: PropTypes.func,
    disablePlaceholder: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
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
      transitionTime,
      renderLoader,
      disablePlaceholder,
      children,
    } = this.props;
    const { hasLoaded, hasFailed, shouldShowLoader } = this.state;
    /*
     * When using ImageLoader the children prop should be a function.
     * Render calls this function with the props it requires to
     * fade in an image.
     * See https://reactjs.org/docs/render-props.html
     */
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

  /*
   * Once the image is loaded successfully this handler will be
   * called, this will change the `hasLoaded` attribute to true
   * then the `shouldShowLoader` attribute to false after
   * the transition has completed. The reason we do this on a
   * timeout is to ensure the loader is not hidden as soon as the
   * image has loaded resulting in a 'flash'
   */
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

  handleImageFailed = () => {
    this.setState({ hasFailed: true });
  };
}

ImageLoader.defaultProps = {
  transitionTime: defaults.transitionTime,
};

export default ImageLoader;

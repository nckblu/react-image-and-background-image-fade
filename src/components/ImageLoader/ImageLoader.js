import React from "react";
import PropTypes from "prop-types";
import preloader from "image-preloader";
import { cssTimeToMs } from "../../util";
import defaults from "../../defaults";
import VisibilitySensor from "react-visibility-sensor";

export class ImageLoader extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    transitionTime: PropTypes.string,
    lazyLoad: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.func,
    ]),
  };

  state = {
    hasLoaded: false,
    hasFailed: false,
    shouldShowLoader: true,
    visibilitySensorIsActive: true,
  };

  componentDidMount() {
    if (!this.props.lazyLoad) {
      this.preloadImage();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      if (!this.props.lazyLoad) {
        this.preloadImage();
      } else {
        this.setState({ visibilitySensorIsActive: true });
      }
    }
  }

  render() {
    const { src, children, lazyLoad } = this.props;
    const {
      hasLoaded,
      hasFailed,
      shouldShowLoader,
      visibilitySensorIsActive,
    } = this.state;
    /*
     * When using ImageLoader the children prop should be a function.
     * Render calls this function with the props it requires to
     * fade in an image.
     * See https://reactjs.org/docs/render-props.html
     */
    const childElement = children({
      hasLoaded,
      shouldShowLoader,
      hasFailed,
      src,
    });

    /*
     * Wrap element in react visibility sensor when lazyLoad is true
     */
    return lazyLoad ? (
      <VisibilitySensor
        active={visibilitySensorIsActive}
        onChange={this.handleVisibilityChange}
        partialVisibility
      >
        {childElement}
      </VisibilitySensor>
    ) : (
      childElement
    );
  }

  preloadImage() {
    const { src } = this.props;
    preloader
      .simplePreload(src)
      .then(this.handleImageLoaderLoaded)
      .catch(this.handleImageLoaderFailed);
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

  handleImageLoaderFailed = () => {
    this.setState({ hasFailed: true });
  };

  handleVisibilityChange = isVisible => {
    if (!isVisible) return;
    this.setState({ visibilitySensorIsActive: false });
    this.preloadImage();
  };
}

ImageLoader.defaultProps = {
  transitionTime: defaults.transitionTime,
};

export default ImageLoader;

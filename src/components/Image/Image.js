import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader'
import ImageLoader from '../ImageLoader'
import Wrapper from './elements/Wrapper'
import Img from './elements/Img'
import defaults from '../../defaults'
import BackgroundImage from '../BackgroundImage'

export const Image = ({
  src,
  width,
  height,
  transitionTime,
  renderLoader,
  disableLoader,
  wrapperClassName,
  isResponsive,
  lazyLoad,
  ...props
}) =>
  /*
   * When in isResponsive is true we will need to make
   * use of <BackgroundImage /> as in order to achieve responsive
   * images with an aspect ratio we need to make use of a background image.
   */
  isResponsive ? (
    <BackgroundImage
      src={src}
      width={width}
      height={height}
      transitionTime={transitionTime}
      renderLoader={renderLoader}
      disableLoader={disableLoader}
      wrapperClassName={wrapperClassName}
      lazyLoad={lazyLoad}
      isResponsive
      {...props}
    />
  ) : (
    <ImageLoader src={src} transitionTime={transitionTime} lazyLoad={lazyLoad}>
      {({ hasLoaded, shouldShowLoader, hasFailed, src }) => {
        return (
          <Wrapper width={width} height={height} className={wrapperClassName}>
            {hasLoaded && (
              <Img src={src} transitionTime={transitionTime} {...props} />
            )}
            {shouldShowLoader && !disableLoader && (
              <Fragment>
                {renderLoader ? (
                  renderLoader({ hasLoaded, hasFailed })
                ) : (
                  <Loader />
                )}
              </Fragment>
            )}
          </Wrapper>
        )
      }}
    </ImageLoader>
  )

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  transitionTime: PropTypes.string,
  renderLoader: PropTypes.func,
  disableLoader: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  lazyLoad: PropTypes.bool,
  isResponsive: PropTypes.bool
}

Image.defaultProps = {
  transitionTime: defaults.transitionTime
}

export default Image

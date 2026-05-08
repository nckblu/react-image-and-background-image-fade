import {
  BackgroundImage,
  createSizes,
  createSrcSet,
  Image,
  ImageConfigProvider,
  ImageLoader,
  Picture
} from 'react-image-and-background-image-fade'
import 'react-image-and-background-image-fade/styles.css'

export function App() {
  return (
    <ImageConfigProvider
      value={{
        color: '#d9dde3',
        duration: 400,
        placeholder: 'color'
      }}
    >
    <main className="demo">
      <Image
        src="/images/profile.jpg"
        alt="Profile"
        width={320}
        height={320}
        srcSet={createSrcSet({
          src: '/images/profile.jpg',
          widths: [320, 640, 960],
          quality: 80
        })}
        sizes={createSizes({ defaultSize: '320px' })}
        lazy
      />

      <BackgroundImage
        src="/images/hero.jpg"
        width="100%"
        aspectRatio="16 / 9"
        lazy={{ rootMargin: '400px 0px' }}
      >
        <div className="hero-content">Background image content</div>
      </BackgroundImage>

      <Picture
        src="/images/landscape.jpg"
        alt="Landscape"
        width={1200}
        height={800}
        sources={[
          { srcSet: '/images/landscape.avif 1200w', type: 'image/avif' },
          { srcSet: '/images/landscape.webp 1200w', type: 'image/webp' }
        ]}
      />

      <ImageLoader src="/images/detail.jpg">
        {state => (
          <div className="custom-loader">
            {state.shouldShowLoader && <span>Loading</span>}
            {state.hasLoaded && <img src={state.src} alt="Detail" />}
            {state.hasFailed && <span>Could not load image</span>}
          </div>
        )}
      </ImageLoader>
    </main>
    </ImageConfigProvider>
  )
}

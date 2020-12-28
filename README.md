[![NPM](https://img.shields.io/npm/v/react-image-and-background-image-fade.svg)](https://www.npmjs.com/package/react-image-and-background-image-fade) [![Build Status](https://travis-ci.org/nckblu/react-image-and-background-image-fade.svg?branch=master)](https://travis-ci.org/nckblu/react-image-and-background-image-fade) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/nckblu/react-image-and-background-image-fade/LICENSE) [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# React Image and Background Image Fade

> Fade in images AND background images easily in React 😉!

## Demo and Docs are live!

[react-image-and-background-image-fade.com](https://react-image-and-background-image-fade.com/)

## Features

- Fade in images and background images 🏞
- ️Lazy loading ⚡
- Custom loaders 👨🏼‍🎨
- Responsive 📱
- Flexible 💪🏾

## Install

```bash
npm install --save react-image-and-background-image-fade
```

or

```bash
yarn add react-image-and-background-image-fade
```

## Table of Contents

- [React Image and Background Image Fade](#react-image-and-background-image-fade)
  - [Demo and Docs are live!](#demo-and-docs-are-live)
  - [Features](#features)
  - [Install](#install)
  - [Table of Contents](#table-of-contents)
  - [<a id="components"></a>Components](#components)
    - [<a id="image"></a>`Image`](#image)
      - [<a id="image--basicUsage"></a>Basic usage](#basic-usage)
      - [<a id="image--responsive"></a>Responsive](#responsive)
      - [<a id="image--lazyLoading"></a> Lazy loading](#-lazy-loading)
      - [<a id="image--customLoaders"></a> Custom loaders](#-custom-loaders)
      - [<a id="image--props"></a>`Image` Props](#image-props)
    - [<a id="backgroundImage"></a>`BackgroundImage`](#backgroundimage)
      - [<a id="backgroundImage--basicUsage"></a>Basic Usage](#basic-usage-1)
      - [<a id="backgroundImage--responsive"></a>Responsive](#responsive-1)
      - [<a id="backgroundImage--lazyLoading"></a>Lazy loading](#lazy-loading)
      - [<a id="backgroundImage--customLoaders"></a>Custom loaders](#custom-loaders)
      - [<a id="backgroundImage--useChild"></a>useChild](#usechild)
      - [<a id="backgroundImage--element"></a>element](#element)
      - [<a id="backgroundImage--props"></a>`BackgroundImage` Props](#backgroundimage-props)
    - [<a id="imageLoader"></a>`ImageLoader`](#imageloader)
      - [<a id="imageLoader--overview"></a>Overview](#overview)
      - [<a id="imageLoader--props"></a> `ImageLoader` Props](#-imageloader-props)
  - [<a id="dependencies"></a> Dependencies](#-dependencies)
  - [<a id="contributions"></a> Contributions](#-contributions)
  - [<a id="demo"></a> Demo + Examples](#-demo--examples)
  - [<a id="roadmap"></a>Roadmap](#roadmap)
  - [<a id="license"></a> License](#-license)

## <a id="components"></a>Components

React Image and Background Image Fade comprises of 3 main components:

- `Image` For preloading and fading in img elements
- `BackgroundImage` For preloading and fading in background images of any element.
- `ImageLoader` For creating your own implementation for image loading.

### <a id="image"></a>`Image`

#### <a id="image--basicUsage"></a>Basic usage

Note here that all unknown props like `alt` and `title` are passed through to the resulting `img` element.

```jsx
import { Image } from 'react-image-and-background-image-fade'

class Example extends Component {
  render () {
    return (
      <Image
        src='https://example.com/neon_cat.jpg'
        width='300px'
        height='300px'
        alt='flying cat'
        title='Neon cat'
      />
    )
  }
}
```

#### <a id="image--responsive"></a>Responsive

When using the `isResponsive` you must ensure that both the width and height are in pixel format, this is because Image calculates the aspect ratio based on the image's width and height. The resulting element will have a width set to 100% and will fill the parent container.

```jsx
import { Image } from 'react-image-and-background-image-fade'

class Example extends Component {
  render () {
    return (
      <Image
        src='https://example.com/neon_cat.jpg'
        width='800px'
        height='400px'
        isResponsive
      />
    )
  }
}
```

#### <a id="image--lazyLoading"></a> Lazy loading

Internally React Image and Background Image Fade makes use of [Visibility Sensor](https://github.com/joshwnj/react-visibility-sensor). When using `lazyLoad` the image will begin loading as soon as the image is partially visible in the viewport.

```jsx
import { Image } from 'react-image-and-background-image-fade'

class Example extends Component {
  render () {
    return (
      <Image
        src='me_drinking_pina_colada.tiff'
        width='800px'
        height='400px'
        lazyLoad
      />
    )
  }
}
```

#### <a id="image--customLoaders"></a> Custom loaders

React Image and Background Image Fade shows a default loader when none is provided which a plain light grey element with an animated 'shine', similar to how Facebook decorate their loading skeletons. You can however specify your own loader element using the `renderLoader` render prop. This expects a function that renders your custom loader.

`hasLoaded` is passed to the function so that your loader can be aware that the image is loaded and you can begin your own transition. Note that the loader will be unmounted after the transition time has finished.

`hasFailed` is so that you an show a custom error in the event of an image load fail.

```jsx
import { Image } from 'react-image-and-background-image-fade'

class Example extends Component {
  render () {
    return (
      <Image
        src='me_drinking_pina_colada.tiff'
        width='20%'
        height='10%'
        renderLoader={({ hasLoaded, hasFailed }) => (
          <div className='MyAwesomeLoader'>
            I'm loading here!
            {hasFailed && <span>But I have failed</span>}
            {hasLoaded && (
              <span>
                I'll be here for (transitionTime) milliseconds after load
              </span>
            )}
          </div>
        )}
      />
    )
  }
}
```

#### <a id="image--props"></a>`Image` Props

All initial prop values are undefined unless otherwise specified. `src`, `width` and `height` are the only required props.

| Prop                                                          | Description                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src` <sub><sup>string</sup></sub>                            | URI to the image, can be an imported local image or a remote image.                                                                                                                                                                                                             |
| `width` <sub><sup>string</sup></sub>                          | Width of the image in string format. This can be any valid CSS value such as "20px", "20%", "20em" etc. When using `isResponsive` width must be in px format.                                                                                                                   |
| `height` <sub><sup>string</sup></sub>                         | Height of the image in string format. This can be any valid CSS value such as "20px", "20%", "20em" etc. When using `isResponsive` width must be in px format.                                                                                                                  |
| `transitionTime` <sub><sup>string \| default 0.3s</sup></sub> | Time used for the fade transition. This can be any valid CSS timing value such as "0.3s", "300ms", "3s". This is also used for unmounting the loader component, so once the image has loaded, `<Image/>` will wait for 0.3s (or `transitionTime`) before unmounting the loader. |
| `renderLoader` <sub><sup>func</sup></sub>                     | A function that renders a custom loader. The function will call `renderLoader` with an object containing the keys `hasLoaded` and `hasFailed`. See Custom loaders.                                                                                                              |
| `disableLoader` <sub><sup>bool</sup></sub>                    | Stop loader element from being shown while the image is loading. Note this will override the behaviour of `renderLoader`.                                                                                                                                                       |
| `wrapperClassName` <sub><sup>string</sup></sub>               | The `className` to apply to the wrapper element.                                                                                                                                                                                                                                |
| `lazyLoad` <sub><sup>bool \| default false</sup></sub>        | Enable or disable lazy loading. See lazy loading.                                                                                                                                                                                                                               |
| `isResponsive` <sub><sup>bool \| default false</sup></sub>    | Enable or disable responsiveness. See Responsive.                                                                                                                                                                                                                               |

<br>
### <a id="backgroundImage"></a>`BackgroundImage`

#### <a id="backgroundImage--basicUsage"></a>Basic Usage

Note here that all unknown props like `alt` and `title` are passed through to the resulting `img` element.

```jsx
import { BackgroundImage } from 'react-image-and-background-image-fade'

class Example extends Component {
  render () {
    return (
      <BackgroundImage
        src='me_drinking_prosecco.jpg'
        width='300px'
        height='300px'
      />
    )
  }
}
```

#### <a id="backgroundImage--responsive"></a>Responsive

When using the `isResponsive` you must ensure that both the width and height are in pixel format, this is because BackgroundImage calculates the aspect ratio based on the image's width and height. The resulting element will have a width set to 100% and will fill the parent container.

```jsx
import { BackgroundImage } from 'react-image-and-background-image-fade'

class BackgroundImage extends Component {
  render () {
    return (
      <BackgroundImage
        src='https://example.com/neon_cat.jpg'
        width='800px'
        height='400px'
        isResponsive
      />
    )
  }
}
```

#### <a id="backgroundImage--lazyLoading"></a>Lazy loading

Internally React Image and Background Image Fade makes use of [Visibility Sensor](https://github.com/joshwnj/react-visibility-sensor). When using `lazyLoad` the image will begin loading as soon as the element is partially visible in the viewport.

```jsx
import { BackgroundImage } from 'react-image-and-background-image-fade'

class Example extends Component {
  render () {
    return (
      <BackgroundImage
        src='me_drinking_pina_colada.tiff'
        width='800px'
        height='400px'
        lazyLoad
      />
    )
  }
}
```

#### <a id="backgroundImage--customLoaders"></a>Custom loaders

React Image and Background Image Fade shows a default loader when none is provided which a plain light grey element with an animated 'shine', similar to how Facebook decorate their loading skeletons. You can however specify your own loader element using the `renderLoader` render prop. This expects a function that renders your custom loader.

`hasLoaded` is passed to the function so that your loader can be aware that the image is loaded and you can begin your own transition. Note that the loader will be unmounted after the transition time has finished.

`hasFailed` is so that you an show a custom error in the event of an image load fail.

```jsx
import { BackgroundImage } from 'react-image-and-background-image-fade'

class Example extends Component {
  render () {
    return (
      <BackgroundImage
        src='me_drinking_pina_colada.tiff'
        width='20%'
        height='10%'
        renderLoader={({ hasLoaded, hasFailed }) => (
          <div className='MyAwesomeLoader'>
            I'm loading here!
            {hasFailed && <span>But I have failed</span>}
            {hasLoaded && (
              <span>
                I'll be here for (transitionTime) milliseconds after load
              </span>
            )}
          </div>
        )}
      />
    )
  }
}
```

#### <a id="backgroundImage--useChild"></a>useChild

By default `BackgroundImage` will create its own element to apply the background to however if you would prefer to use your own element you can simply include it within `BackgroundImage` as a child and set `useChild` to `true`.

```jsx
import { BackgroundImage } from 'react-image-and-background-image-fade'

class Example extends Component {
  render () {
    return (
      <BackgroundImage
        useChild
        width='200px'
        height='200px'
        src='me_drinking_guinness.gif'
      >
        <div
          style={{ width: '500px', height: '500px', backgroundSize: 'cover' }}
        >
          I'm in a child wrapper enjoying that sweet background.
        </div>
      </BackgroundImage>
    )
  }
}
```

#### <a id="backgroundImage--element"></a>element

`BackgroundImage` creates a wrapper `div` element and the element that the background is attached to is by default a `div` this can be changed to any other valid html element. If you would like to apply the background image to a custom component, see `useChild`.

```jsx
import { BackgroundImage } from 'react-image-and-background-image-fade'

class Example extends Component {
  render () {
    return (
      <BackgroundImage
        element='p'
        width='200px'
        height='200px'
        src='me_drinking_guinness.gif'
      >
        Look at me i'm a paragraph.
      </BackgroundImage>
    )
  }
}
```

#### <a id="backgroundImage--props"></a>`BackgroundImage` Props

All initial prop values are undefined unless otherwise specified. `src`, `width` and `height` are the only required props.

| Prop                                                          | Description                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src` <sub><sup>string</sup></sub>                            | URI to the image, can be an imported local image or a remote image.                                                                                                                                                                                                                    |
| `width` <sub><sup>string</sup></sub>                          | Width of the element in string format. This can be any valid CSS value such as "20px", "20%", "20em" etc. When using `isResponsive` width must be in px format.                                                                                                                        |
| `height` <sub><sup>string</sup></sub>                         | Height of the element in string format. This can be any valid CSS value such as "20px", "20%", "20em" etc. When using `isResponsive` width must be in px format.                                                                                                                       |
| `transitionTime` <sub><sup>string \| default 0.3s</sup></sub> | Time used for the fade transition. This can be any valid CSS timing value such as "0.3s", "300ms", "3s". This is also used for unmounting the loader component, so once the image has loaded, `BackgroundImage` will wait for 0.3s (or `transitionTime`) before unmounting the loader. |
| `renderLoader` <sub><sup>func</sup></sub>                     | A function that renders a custom loader. The function will call `renderLoader` with an object containing the keys `hasLoaded` and `hasFailed`. See Custom loaders.                                                                                                                     |
| `disableLoader` <sub><sup>bool</sup></sub>                    | Stop loader element from being shown while the image is loading. Note this will override the behaviour of `renderLoader`.                                                                                                                                                              |
| `wrapperClassName` <sub><sup>string</sup></sub>               | The `className` to apply to the wrapper element.                                                                                                                                                                                                                                       |
| `lazyLoad` <sub><sup>bool \| default false</sup></sub>        | Enable or disable lazy loading. See lazy loading.                                                                                                                                                                                                                                      |
| `isResponsive` <sub><sup>bool \| default false</sup></sub>    | Enable or disable responsiveness. See Responsive.                                                                                                                                                                                                                                      |
| `useChild` <sub><sup>bool \| default false</sup></sub>        | Whether or not to use the child as the element to apply the background image to. See useChild.                                                                                                                                                                                         |
| `element` <sub><sup>string</sup></sub>                        | The string element name of the element you would like `BackgroundImage` to create and apply the background image too. See element.                                                                                                                                                     |

### <a id="imageLoader"></a>`ImageLoader`

#### <a id="imageLoader--overview"></a>Overview

Both `Image` and `BackgroundImage` make use of `ImageLoader` internally. It can be useful for creating your own loader and any advanced use case that the other two components can't cater for.

`ImageLoader` is used via a [render prop](https://reactjs.org/docs/render-props.html) as the child. The method provided as the child will be called with an object with the following keys:

- `hasLoaded` (bool) - True when image retrieval was success
- `shouldShowLoader` (bool) - True when the loader should be shown, this is useful for when the image has loaded but you want to continue to keep the loader mounted for `transitionTime` seconds to complete the transition.
- `hasFailed` (bool) - True when retrieving the image was unsuccessful
- `src` (string) - The source of the image (pass-through)

```jsx
import { ImageLoader } from 'react-image-and-background-image-fade'

class AwesomeOLoader extends Component {
  render () {
    return (
      <ImageLoader src='awesome-o.gif' transitionTime='0.3s'>
        {({ hasLoaded, shouldShowLoader, hasFailed, src }) => (
          <div className='AwesomeOLoader'>
            {shouldShowLoader && !hasFailed && (
              <div className='AwesomeoLoader__loading'>
                Awesome-o is loading ...
              </div>
            )}

            {hasFailed && (
              <div className='AwesomeoLoader__failed'>
                Awesome-o has failed :(
              </div>
            )}

            {hasLoaded && (
              <div
                className='AwesomeoLoader__failed'
                style={{ backgroundImage: `url(${src})` }}
              >
                Awesome-o has Loaded!! :(
              </div>
            )}
          </div>
        )}
      </ImageLoader>
    )
  }
}
```

#### <a id="imageLoader--props"></a> `ImageLoader` Props

All initial prop values are undefined unless otherwise specified. `src` and `children`.

| Prop                                                          | Description                                                                                                                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src` <sub><sup>string</sup></sub>                            | URI to the image, can be an imported local image or a remote image.                                                                                                |
| `transitionTime` <sub><sup>string \| default 0.3s</sup></sub> | Time used for the transition. This can be any valid CSS timing value such as "0.3s", "300ms", "3s". Works in conjunction with `shouldShowLoader`. See ImageLoader. |
| `lazyLoad` <sub><sup>bool \| default false</sup></sub>        | Enable or disable lazy loading. See lazy loading.                                                                                                                  |
| `children`                                                    | Render prop to render. Calls `children` with the following: `({ hasLoaded, shouldShowLoader, hasFailed, src })`. See Overview.                                     |

## <a id="dependencies"></a> Dependencies

React Image and Background Image is not a depency-free component. It aims to provide a fully featured and flexible solution for image and background preloading. It makes use of the following awesome npm packages:

- [ImagePreloader](https://github.com/smelukov/ImagePreloader) - Under the hood for the actual preloading of the image
- [React Visibility Sensor](https://github.com/joshwnj/react-visibility-sensor) - Lazy load functionality
- [Styled Components](https://github.com/styled-components/styled-components) - Dynamic styling under the hood

## <a id="contributions"></a> Contributions

React Image and Background Image is very young at the moment and thoroughly encourages pull requests and issues.

## <a id="demo"></a> Demo + Examples

[Click here to go to the website](https://react-image-and-background-image-fade.com/)

## <a id="roadmap"></a>Roadmap

- `srcset` support

## <a id="license"></a> License

MIT © [nckblu](https://github.com/nckblu)

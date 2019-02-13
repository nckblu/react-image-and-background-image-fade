[![NPM](https://img.shields.io/npm/v/react-image-and-background-image-fade.svg)](https://www.npmjs.com/package/react-image-and-background-image-fade) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/nckblu/a2b/LICENSE)

# React Image and Background Image Fade

> Fade in images AND background images easily in React 😉!

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

## Components

React Image and Background Image Fade comprises of 3 main components:

- `<Image />` For preloading and fading in img elements
- `<BackgroundImage />` For preloading and fading in background images of any element.
- `<ImageLoader />` For creating your own implementation for image loading.

### `<Image />`

#### Basic Usage

Note here that all unknown props like `alt` and `title` are passed through to the resulting `img` element.

```jsx
import { Image } from "react-image-and-background-image-fade";

class Example extends Component {
  render() {
    return (
      <Image
        src="https://example.com/neon_cat.jpg"
        width="300px"
        height="300px"
        alt="flying cat"
        title="Neon cat"
      />
    );
  }
}
```

#### Responsive

When using the `isResponsive` you must ensure that both the width and height are in pixel format, this is because Image calculates the aspect ratio based on the image's width and height. The resulting element will have a width set to 100% and will fill the parent container.

```jsx
import { Image } from "react-image-and-background-image-fade";

class Example extends Component {
  render() {
    return (
      <Image
        src="https://example.com/neon_cat.jpg"
        width="800px"
        height="400px"
        isResponsive
      />
    );
  }
}
```

#### Lazy loading

Internally React Image and Background Image Fade makes use of [Visibility Sensor](https://github.com/joshwnj/react-visibility-sensor). When using `lazyLoad` the image will begin loading as soon as the image is partially visible in the viewport.

```jsx
import { Image } from "react-image-and-background-image-fade";

class Example extends Component {
  render() {
    return (
      <Image
        src="me_drinking_pina_colada.tiff"
        width="800px"
        height="400px"
        lazyLoad
      />
    );
  }
}
```

#### Custom loaders

React Image and Background Image Fade shows a default loader when none is provided which a plain light grey element with an animated 'shine', similar to how Facebook decorate their loading skeletons. You can however specify your own loader element using the `renderLoader` render prop. This expects a function that renders your custom loader.

`hasLoaded` is passed to the function so that your loader can be aware that the image is loaded and you can begin your own transition. Note that the loader will be unmounted after the transition time has finished.

`hasFailed` is so that you an show a custom error in the event of an image load fail.

```jsx
import { Image } from "react-image-and-background-image-fade";

class Example extends Component {
  render() {
    return (
      <Image
        src="me_drinking_pina_colada.tiff"
        width="20%"
        height="10%"
        renderLoader={({ hasLoaded, hasFailed }) => (
          <div className="MyAwesomeLoader">
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
    );
  }
}
```

#### `<Image />` Props

All initial prop values are undefined unless otherwise specified.
Prop | Description
| --- | --- |
`src` <sub><sup>string</sup></sub> | URI to the image, can be an imported local image or a remote image.|
`width` <sub><sup>string</sup></sub> | Width of the image in string format. This can be any valid CSS value such as "20px", "20%", "20em" etc. When using `isResponsive` width must be in px format.|
`height` <sub><sup>string</sup></sub> | Height of the image in string format. This can be any valid CSS value such as "20px", "20%", "20em" etc. When using `isResponsive` width must be in px format.|
`transitionTime` <sub><sup>string \| default 0.3s</sup></sub> | Time used for the fade transition. This can be any valid CSS timing value such as "0.3s", "300ms", "3s". This is also used for unmounting the loader component, so once the image has loaded, `<Image/>` will wait for 0.3s (or `transitionTime`) before unmounting the loader.|
`renderLoader` <sub><sup>func</sup></sub> | A function that renders a custom loader. The function will call `renderLoader` with an object containing the keys `hasLoaded` and `hasFailed`. See Custom loaders.|
`disableLoader` <sub><sup>bool</sup></sub> | Stop loader element from being shown while the image is loading. Note this will override the behaviour of `renderLoader`.|
`wrapperClassName` <sub><sup>string</sup></sub> | The `className` to apply to the wrapper element.|
`lazyLoad` <sub><sup>bool \| default false</sup></sub> | Enable or disable lazy loading. See lazy loading.|
`isResponsive` <sub><sup>bool \| default false</sup></sub> | Enable or disable responsiveness. See Responsive.|

## License

MIT © [nckblu](https://github.com/nckblu)

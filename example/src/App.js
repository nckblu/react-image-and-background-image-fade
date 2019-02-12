import React, { Component } from "react";

// import { Image } from "react-image-and-background-image-fade";
// import {
//   Image,
//   ImageLoader,
//   // BackgroundImage,
//   noho,
// } from "react-image-and-background-image-fade";
import { BackgroundImage, Image } from "react-image-and-background-image-fade";
// console.log("noho", noho);

export default class App extends Component {
  render() {
    return (
      <div>
        <Image
          height="400px"
          width="400px"
          wrapperClassName="Some img"
          src="https://images.unsplash.com/photo-1542838687-936f417d2f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        />

        <BackgroundImage
          useChild
          width="200px"
          height="200px"
          title="tes2"
          wrapperClassName="test"
          src="https://images.unsplash.com/photo-1542838687-936f417d2f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        >
          <div
            className="YOPA"
            style={{ width: "500px", height: "500px", backgroundSize: "cover" }}
          />
        </BackgroundImage>
        <BackgroundImage
          width="500px"
          height="500px"
          src="https://images.unsplash.com/photo-1542838687-936f417d2f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        >
          I'm a child
        </BackgroundImage>
        <BackgroundImage
          width="500px"
          height="500px"
          wrapperClassName="test"
          className="bleugh"
          title="tes2"
          lazyLoad
          style={{ backgroundSize: "cover" }}
          src="https://images.unsplash.com/photo-1542838687-936f417d2f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        >
          I'm a child
        </BackgroundImage>
        <BackgroundImage
          width="500px"
          height="250px"
          isResponsive
          wrapperClassName="test"
          className="bleugh"
          title="tes2"
          lazyLoad
          disableLoader
          style={{ backgroundSize: "cover" }}
          src="https://images.unsplash.com/photo-1542838687-936f417d2f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        >
          I'm a child
        </BackgroundImage>
        <Image
          height="400px"
          width="400px"
          lazyLoad
          isResponsive
          disableLoader
          renderLoader={() => "IM LOADING HERE"}
          wrapperClassName="Some img"
          src="https://images.unsplash.com/photo-1542838687-936f417d2f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        />
      </div>
    );
  }
}

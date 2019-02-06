import React, { Component } from "react";

// import { Image } from "react-image-and-background-image-fade";
// import {
//   Image,
//   ImageLoader,
//   // BackgroundImage,
//   noho,
// } from "react-image-and-background-image-fade";
import { BackgroundImage } from "react-image-and-background-image-fade";
// console.log("noho", noho);

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <Image
          height={400}
          width={400}
          src="https://images.unsplash.com/photo-1542838687-936f417d2f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
				/> */}

        <BackgroundImage
          useChild
          width="500px"
          height="500px"
          src="https://images.unsplash.com/photo-1542838687-936f417d2f37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        >
          <div
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
      </div>
    );
  }
}

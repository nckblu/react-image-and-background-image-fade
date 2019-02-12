import React from "react";
import Image from "../components/Image";
import renderer from "react-test-renderer";
import { simplePreloadMock } from "./__mocks__/ImageLoader";
import { mount } from "enzyme";
import { flushPromises } from "./util";

jest.mock("image-preloader");
const ImagePreloader = require("image-preloader");
ImagePreloader.simplePreload.mockImplementation(simplePreloadMock);

describe("Image", () => {
  const genericProps = {
    src: "me-drinking-pina-colada.jpg",
    width: "300px",
    height: "300px",
    wrapperClassName: "MaWrapperClass",
  };

  const renderLoader = () => (
    <div className='Loading'>We loading up in here</div>
  );

  it("Matches snapshot of generic props", () => {
    const props = {
      ...genericProps,
    };
    const tree = renderer.create(<Image {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should display loader while image is loading", () => {
    const props = {
      ...genericProps,
      renderLoader,
    };
    const wrapper = mount(<Image {...props} />);
    expect(wrapper.find(".Loading").length).toEqual(1);
  });

  it("Uses the wrapperClassName prop when provided", () => {
    const props = {
      ...genericProps,
    };
    const wrapper = mount(<Image {...props} />);
    expect(wrapper.find(`.${props.wrapperClassName}`).length).toBeGreaterThan(
      0
    );
  });

  it("Should display image once loaded", async () => {
    const props = {
      ...genericProps,
      renderLoader,
    };
    const wrapper = mount(<Image {...props} />);
    await flushPromises();
    wrapper.update();
    expect(wrapper.find("img").length).toEqual(1);
    expect(
      wrapper.find("img").filterWhere(img => img.props().src === props.src)
        .length
    ).toEqual(1);
  });

  it("Should hide loader once loaded", async () => {
    const props = {
      ...genericProps,
      renderLoader,
    };
    jest.useFakeTimers();
    const wrapper = mount(<Image {...props} />);
    /*
     * Here we need to use some poopery to ensure that
     * the promise is resolved, the component's update is
     * triggered, then to wait for the transition time to complete
     * then trigger the component update again so we can check
     * that the loader has gone.
     */
    await flushPromises();
    wrapper.update();
    jest.runAllTimers();
    wrapper.update();
    jest.useRealTimers();

    expect(wrapper.find(".Loading").length).toEqual(0);
  });
});

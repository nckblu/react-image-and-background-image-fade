import React from "react";
import BackgroundImage from "../components/BackgroundImage";
import renderer from "react-test-renderer";
import { simplePreloadMock } from "./__mocks__/ImageLoader";
import { mount } from "enzyme";
import { flushPromises } from "./util";

jest.mock("image-preloader");
const ImagePreloader = require("image-preloader");
ImagePreloader.simplePreload.mockImplementation(simplePreloadMock);

const renderLoader = () => <div className='Loading'>We loading up in here</div>;

describe("BackgroundImage", () => {
  const genericProps = {
    src: "me-drinking-pina-colada.jpg",
    width: "300px",
    height: "300px",
    wrapperClassName: "MaWrapperClass",
  };

  it("Matches snapshot of generic props", () => {
    const props = {
      ...genericProps,
    };
    const tree = renderer.create(<BackgroundImage {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should display loader while image is loading", () => {
    const props = {
      ...genericProps,
      renderLoader,
    };
    const wrapper = mount(<BackgroundImage {...props} />);
    expect(wrapper.find(".Loading").length).toEqual(1);
  });

  it("Shouldn't display loader while image is loading when disableLoader is true", () => {
    const props = {
      ...genericProps,
      renderLoader,
      disableLoader: true,
    };
    const wrapper = mount(<BackgroundImage {...props} />);
    expect(wrapper.find(".Loading").length).toEqual(0);
  });

  it("Should hide loader once loaded", async () => {
    const props = {
      ...genericProps,
      renderLoader,
    };
    jest.useFakeTimers();
    const wrapper = mount(<BackgroundImage {...props} />);
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

  it("Should display background image once loaded", async () => {
    const props = {
      ...genericProps,
      renderLoader,
    };

    const wrapper = mount(<BackgroundImage {...props} />);
    await flushPromises();
    wrapper.update();

    expect(
      wrapper
        .find("div.MaWrapperClass > div")
        .first()
        .props().style.backgroundImage
    ).toEqual(`url("${props.src}")`);
  });

  it("Uses the element prop correctly for the creation of the background image", async () => {
    const props = {
      ...genericProps,
      renderLoader,
      element: "p",
    };

    const wrapper = mount(<BackgroundImage {...props} />);
    await flushPromises();
    wrapper.update();
    expect(wrapper.find("div.MaWrapperClass > p").length).toEqual(1);
  });

  it("Attaches background-image CSS to child when using useChild prop", async () => {
    const props = {
      ...genericProps,
      renderLoader,
      useChild: true,
    };

    const wrapper = mount(
      <BackgroundImage {...props}>
        <div className='ImAChild' />
      </BackgroundImage>
    );
    await flushPromises();
    wrapper.update();
    expect(wrapper.find(".ImAChild").props().style.backgroundImage).toEqual(
      `url("${props.src}")`
    );
  });

  it("Preserves child style when using useChild prop", async () => {
    const props = {
      ...genericProps,
      renderLoader,
      useChild: true,
    };

    const childStyle = { fontSize: "20000px" };
    const wrapper = mount(
      <BackgroundImage {...props}>
        <div className='ImAChild' style={childStyle} />
      </BackgroundImage>
    );
    await flushPromises();
    wrapper.update();
    expect(wrapper.find(".ImAChild").props().style.fontSize).toEqual("20000px");
  });

  it("Sets paddingTop aspect ratio when using isResponsive prop", async () => {
    const props = {
      ...genericProps,
      renderLoader,
      isResponsive: true,
    };

    const wrapper = mount(<BackgroundImage {...props} />);
    await flushPromises();
    wrapper.update();
    expect(
      wrapper
        .find("div.MaWrapperClass > div")
        .first()
        .props().style.paddingTop
    ).toBeTruthy();
  });
});

import React from "react";
import ImageLoader from "../components/ImageLoader";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { flushPromises } from "./util";
import { FAIL_SRC, simplePreloadMock } from "./__mocks__/ImageLoader";

jest.mock("image-preloader");
const ImagePreloader = require("image-preloader");
ImagePreloader.simplePreload.mockImplementation(simplePreloadMock);

describe("ImageLoader", () => {
  beforeEach(() => {
    ImagePreloader.simplePreload.mockClear();
  });

  const genericProps = {
    src: "me-drinking-pina-colada.jpg",
    children: ({ src }) => <div className='oh-hey'>{src}</div>,
  };

  it("Matches snapshot of generic props", () => {
    const props = {
      ...genericProps,
    };
    const tree = renderer.create(<ImageLoader {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should call preload image with the src", () => {
    const props = { ...genericProps };
    shallow(<ImageLoader {...props} />);
    expect(ImagePreloader.simplePreload.mock.calls[0][0]).toEqual(props.src);
  });

  it("Should call preload image just the once", () => {
    const props = { ...genericProps };
    shallow(<ImageLoader {...props} />);
    expect(ImagePreloader.simplePreload.mock.calls.length).toEqual(1);
  });

  it("Should set hasLoaded to true once the image has loaded", async () => {
    const props = { ...genericProps };
    const wrapper = shallow(<ImageLoader {...props} />);
    await flushPromises();
    wrapper.update();
    expect(wrapper.state("hasLoaded")).toEqual(true);
  });

  it("Should keep 'shouldShowLoader' true for the specified transitionTime", async () => {
    jest.useFakeTimers();
    const props = { ...genericProps, transitionTime: "0.5s" };
    const wrapper = shallow(<ImageLoader {...props} />);
    await flushPromises();
    wrapper.update();
    expect(wrapper.state("shouldShowLoader")).toEqual(true);
    jest.runTimersToTime(500);
    expect(wrapper.state("shouldShowLoader")).toEqual(false);
    jest.useRealTimers();
  });

  it("Reacts properly to a change in src prop", () => {
    const props = { ...genericProps };
    const newSrc = "pickle_rick.tiff";
    const wrapper = shallow(<ImageLoader {...props} />);
    expect(ImagePreloader.simplePreload.mock.calls[0][0]).toEqual(props.src);
    wrapper.setProps({ src: newSrc });
    expect(ImagePreloader.simplePreload.mock.calls[1][0]).toEqual(newSrc);
  });

  it("Should set hasFailed to true when there is a failure to load image", async () => {
    const props = { ...genericProps, src: FAIL_SRC };
    const wrapper = shallow(<ImageLoader {...props} />);
    await flushPromises();
    wrapper.update();
    expect(wrapper.state("hasFailed")).toEqual(true);
  });
});

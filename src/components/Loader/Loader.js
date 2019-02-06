import React from "react";
import styled, { keyframes } from "styled-components";

export const Loader = ({ isOnTop, hasLoaded, transitionTime }) => (
  <Wrapper
    isOnTop={isOnTop}
    hasLoaded={hasLoaded}
    transitionTime={transitionTime}
  />
);

export default Loader;

Loader.defaultProps = {
  transitionTime: "0.3s",
};
const shine = keyframes`
  from {
    background-position: 0 0 ;
  }

  to {
    background-position: calc(100% + 50px);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${props => (props.isOnTop ? 10 : -1)};
  opacity: ${props => (props.isOnTop ? (props.hasLoaded ? 0 : 1) : 1)};
  transition: opacity ${props => props.transitionTime} ease;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 120%;
    height: 120%;
    transform: rotate(-30deg);
    background-image: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 80%
    );
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100px 100%;
    animation: ${shine} 1s infinite linear;
  }
`;

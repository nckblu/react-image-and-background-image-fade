import styled from "styled-components";

export const Wrapper = styled.div`
  ${({ width, isResponsive }) => !!width && !isResponsive && `width: ${width}`};
  ${({ height, isResponsive }) =>
    !!height && !isResponsive && `height: ${height}`};
  ${({ isResponsive }) =>
    isResponsive &&
    `
      width: 100%;
      height: 100%;
    `};
  position: relative;
  overflow: hidden;
`;

export default Wrapper;

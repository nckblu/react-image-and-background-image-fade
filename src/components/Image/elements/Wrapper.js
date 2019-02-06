import styled from "styled-components";

export const Wrapper = styled.div`
  ${({ width }) => !!width && `width: ${width}`};
  ${({ height }) => !!height && `height: ${height}`};
  position: relative;
  overflow: hidden;
`;

export default Wrapper;

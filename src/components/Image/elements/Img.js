import styled from "styled-components";
import { fadeIn } from "../../../keyframes";

export const Img = styled.img`
  width: 100%;
  height: 100%;
  animation: ${fadeIn} ${props => props.transitionTime} ease;
`;

export default Img;

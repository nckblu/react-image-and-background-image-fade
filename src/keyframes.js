import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const shine = keyframes`
  from {
    background-position: 0 0 ;
  }

  to {
    background-position: calc(100% + 50px);
  }
`;

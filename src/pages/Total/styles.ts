import styled, { keyframes } from 'styled-components';

const iconFlipAnimation = keyframes`
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 1.6rem;

  & svg.total-home-arrow {
    animation: ${iconFlipAnimation} 0.5s forwards;
  }
`;

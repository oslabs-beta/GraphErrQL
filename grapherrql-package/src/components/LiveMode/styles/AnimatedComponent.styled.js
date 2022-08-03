import styled, { keyframes } from 'styled-components';

const blinkingEffect = () => {
  return keyframes`
      50% {
        opacity: 0;
      }
    `;
};

export const BlinkingComponent = styled.div`
  animation: ${blinkingEffect} 1.8s linear infinite;
`;

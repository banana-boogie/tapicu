import React from 'react';
import styled from 'styled-components';

type PropTypes = {
  currentStep: number;
  totalSteps: number;
};

function ProgressBar({ currentStep, totalSteps, ...delegated }: PropTypes) {
  const Bar = [];
  for (let i = 0; i < totalSteps; i++) {
    const color =
      i <= currentStep ? 'var(--color-accent)' : 'var(--color-gray-300)';
    if (i === 0) {
      Bar.push(
        <Unit key={i}>
          <Circle key={`circle-${i}`} color={color}>
            <InnerCircle key={`inner-circle-${i}`} />
          </Circle>
        </Unit>
      );
    } else {
      Bar.push(
        <Unit key={i}>
          <Line key={`line-${i}`} color={color} />
          <Circle key={`circle-${i}`} color={color}>
            <InnerCircle key={`inner-circle-${i}`} />
          </Circle>
        </Unit>
      );
    }
  }
  return <Wrapper {...delegated}>{Bar}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Unit = styled.div`
  display: flex;
  align-items: center;
`;

const CircleBase = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const InnerCircle = styled(CircleBase)`
  width: 3px;
  height: 3px;
  background-color: white;
  z-index: 1;
`;

const Circle = styled(CircleBase)`
  background-color: ${(props) => props.color};
  isolation: isolate;
  display: grid;
  place-content: center;
`;

const Line = styled.div`
  background-color: ${(props) => props.color};
  width: 24px;
  height: 3px;
`;

export default ProgressBar;

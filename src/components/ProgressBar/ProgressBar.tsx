import React from "react";
import styled from "styled-components";

// game plan
// total number of steps
// current step
// render current step
// figure out how to know when to update the current step , probably event driven

interface PropTypes {
  currentStep: number;
  totalSteps: number;
}

function ProgressBar({ currentStep, totalSteps, ...delegated }: PropTypes) {
  const Bar = [];
  for (let i = 0; i < totalSteps; i++) {
    const color =
      i <= currentStep ? "var(--color-accent)" : "var(--color-gray-300)";
    if (i === 0) {
      Bar.push(
        <>
          <Circle color={color}>
            <InnerCircle />
          </Circle>
        </>
      );
    } else {
      Bar.push(
        <>
          <Line color={color} />
          <Circle color={color}>
            <InnerCircle />
          </Circle>
        </>
      );
    }
  }
  return <Wrapper {...delegated}>{Bar}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CircleBase = styled.div`
  width: 30px;
  height: 30px;
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

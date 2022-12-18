import React from 'react';
import styled from 'styled-components';

import Icon from '@components/Icon';
import ProgressBarComponent from '@components/ProgressBar';
import UnstyledButton from '@components/UnstyledButton';

type Props = {
  currentStep: number;
  totalSteps: number;
  handleBack: () => void;
  hideArrow?: boolean;
};

function CookiePageHeader({
  currentStep,
  totalSteps,
  handleBack,
  hideArrow,
}: Props) {
  return (
    <PageHeaderWrapper>
      {currentStep > 0 && !hideArrow ? (
        <BackButtonWrapper>
          <BackButton onClick={handleBack}>
            <BackIcon
              id="back"
              strokeWidth={2}
              size={24}
              color={'var(--color-accent)'}
            />
          </BackButton>
        </BackButtonWrapper>
      ) : (
        <Spacer />
      )}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <Spacer />
    </PageHeaderWrapper>
  );
}
const PageHeaderWrapper = styled.div`
  display: flex;
  padding: var(--space-md) 0;
`;

const Spacer = styled.div`
  flex: 1;
`;

const ProgressBar = styled(ProgressBarComponent)`
  max-height: 100px;
`;

const BackButtonWrapper = styled.div`
  flex: 1;
  align-self: center;
`;
const BackButton = styled(UnstyledButton)``;
const BackIcon = styled(Icon)``;

export default CookiePageHeader;

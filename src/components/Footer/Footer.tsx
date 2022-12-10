import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <a href="" target="_blank" rel="noopener noreferrer">
        Tapic&uacute;{' '}
        <span>
          <Image src="/" alt="Tapicu Logo" width={72} height={16} />
        </span>
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  border: solid hotpink;
  padding: 8px;
  margin-top: auto;
`;

export default Footer;

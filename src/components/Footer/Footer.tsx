import React from "react";
import Image from "next/image";
import styled from "styled-components";

export default function Footer() {
  return (
    <Wrapper>
      <Link href="" target="_blank" rel="noopener noreferrer">
        Abi&apos;s Cookies
      </Link>
      <span>
        <Image src="/logo.png" alt="logo" width={24} height={24} />
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  padding: var(--space-xs);
  margin-top: var(--space-lg);
  display: flex;
  justify-content: center;
  gap: var(--space-xs);
`;

const Link = styled.a`
  text-decoration: none;
  align-self: center;
`;

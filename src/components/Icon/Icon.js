import React from 'react';
import styled from 'styled-components';
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  ChevronDown,
  Email,
  Facebook,
  Menu,
  Instagram,
  Loader,
  Link,
  Search,
  ShoppingBag,
  Youtube,
  X,
} from './IconPack';

const icons = {
  search: Search,
  menu: Menu,
  'shopping-bag': ShoppingBag,
  'chevron-down': ChevronDown,
  email: Email,
  close: X,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  loader: Loader,
  copy: Copy,
  link: Link,
  back: ArrowLeft,
  'arrow-right': ArrowRight,
};

const Icon = ({ id, color = 'black', size, strokeWidth, ...delegated }) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <Wrapper strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > svg {
    display: block;
    stroke-width: ${(p) =>
      p.strokeWidth !== undefined ? p.strokeWidth + 'px' : undefined};
  }
`;

export default Icon;

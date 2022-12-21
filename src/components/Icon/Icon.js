import styled from "styled-components";
import React from "react";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
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
  xOctagon,
} from "./IconPack";

const icons = {
  "alert-circle": AlertCircle,
  "alert-octagon": AlertOctagon,
  "alert-triangle": AlertTriangle,
  "check-circle": CheckCircle,
  search: Search,
  menu: Menu,
  "shopping-bag": ShoppingBag,
  "chevron-down": ChevronDown,
  email: Email,
  close: X,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  loader: Loader,
  copy: Copy,
  link: Link,
  back: ArrowLeft,
  "arrow-right": ArrowRight,
  "x-octagon": xOctagon,
};

const Icon = ({
  id,
  color = "black",
  size,
  fill,
  strokeWidth,
  ...delegated
}) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <Wrapper strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} fill={fill} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > svg {
    display: block;
    stroke-width: ${(p) =>
      p.strokeWidth !== undefined ? p.strokeWidth + "px" : undefined};
  }
`;

export default Icon;

import React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
}

export const XButtonIcon = ({ onClick }: Props) => (
  <StyledContainer onClick={onClick}><StyledXIcon /></StyledContainer>
)


const StyledContainer = styled.span`
  position: absolute;
  right: 10px;
  padding: 1px 3px 4px;
  border-radius: 50%;

  &:hover {
    background: darkgray;
    cursor: pointer;
  }
`;

const StyledXIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  color: #333;
  line-height: 1;
  width: 1em;
  height: 0.1em;
  background: currentColor;
  border-radius: 0.1em;
  position: relative;
  transform: rotate(45deg);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    transform: rotate(90deg);
  }
`;
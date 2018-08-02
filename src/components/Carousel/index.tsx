import * as React from "react";
import { Icon } from "antd";
import styled from "styled-components";

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  position: number;
  children: any;
  disabled?: boolean;
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

interface ICProps {
  side: string;
  disabled?: boolean;
}

const IconContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  width: 10%;
  ${(props: ICProps) => `${props.side}: 0;`};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props: ICProps) => props.disabled ? 'wait' : 'pointer'};

  .anticon {
    color: #c00d0d;
    font-weight: bold;
    font-size: 32px;
  }

  &:hover{
  transform: scale(1.3);
  }

  @media only screen and (max-width: 768px) {
    &:hover{
      transform: scale(1);
    }
  }
`;

/**
 * Simple carousel
 */
export default function Carousel(props: Props) {
  return (
    <Container>
      {props.position === 0 ? null :
        <IconContainer
          side="left"
          onClick={props.disabled ? undefined : props.onPrevious}
          disabled={props.disabled}
        >
          <Icon type="left" />
        </IconContainer>
      }
      {props.children}
      <IconContainer
        side="right"
        onClick={props.disabled ? undefined : props.onNext}
        disabled={props.disabled}
      >
        <Icon type="right" />
      </IconContainer>
    </Container>
  );
}
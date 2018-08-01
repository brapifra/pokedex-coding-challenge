import * as React from "react";
import { Icon } from "antd";
import styled from "styled-components";

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  position: number;
  children: any;
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10%;
  ${({ side }: { side: string }) => `${side}: 0;`};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .anticon {
    color: #c00d0d;
    font-weight: bold;
    font-size: 32px;
  }
`;

export default function Carousel(props: Props) {
  return (
    <Container>
      {props.position === 0 ? null :
        <IconContainer side="left" onClick={props.onPrevious}>
          <Icon type="left" />
        </IconContainer>
      }
      {props.children}
      <IconContainer side="right" onClick={props.onNext}>
        <Icon type="right" />
      </IconContainer>
    </Container>
  );
}
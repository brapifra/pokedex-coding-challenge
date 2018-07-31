import * as React from 'react';
import { Spin as spin } from 'antd';
import styled from "styled-components";

interface Props {
  loading: boolean;
  children: any;
}

const LoadingScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  filter: ${(props: Props) => props.loading ? 'blur(5px)' : 'blur(0px)'};
`;

const Spin = styled(spin)`
  .ant-spin-dot i{
    background-color: red
  }
`;

export default function Loading(props: Props) {
  return (
    <LoadingScreen loading={props.loading}>
      <div>
        {props.loading ? <Spin /> : props.children}
      </div>
    </LoadingScreen>
  );
};
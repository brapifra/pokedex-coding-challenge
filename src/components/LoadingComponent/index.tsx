import * as React from 'react';
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


export default function Loading(props: Props) {
  return <LoadingScreen loading={props.loading}>{props.children}</LoadingScreen>;
};